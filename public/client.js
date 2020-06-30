var converter = new showdown.Converter();
converter.setOption('openLinksInNewWindow', true);

var Botkit = {
    config: {
        ws_url: (location.protocol === 'https:' ? 'wss' : 'ws') + '://' + location.host,
        reconnect_timeout: 3000,
        max_reconnect: 5
    },
    reconnect_count: 0,
    guid: null,
    current_user: null,
    on: function (event, handler) {
        this.message_window.addEventListener(event, function (evt) {
            handler(evt.detail);
        });
    },
    trigger: function (event, details) {
        var event = new CustomEvent(event, {
            detail: details
        });
        this.message_window.dispatchEvent(event);
    },
    send: function (text, e) {
        var that = this;
        if (e) e.preventDefault();
        if (!text) {
            return;
        }
        var message = {
            type: 'outgoing',
            text: text
        };

        this.clearReplies();
        renderMessage(message, that);

        that.deliverMessage({
            type: 'message',
            text: text,
            user: this.guid,
            channel: 'websocket'
        });

        this.input.value = '';
        this.trigger('sent', message);

        return false;
    },
    deliverMessage: function (message) {        
        this.socket.send(JSON.stringify(message));
    },
    connect: function (user) {
        var that = this;
        that.connectWebsocket(that.config.ws_url);
    },
    connectWebsocket: function (ws_url) {
        var that = this;
        that.socket = new WebSocket(ws_url);        

        var connectEvent = 'hello';
        if (Botkit.getCookie('botkit_guid')) {
            that.guid = Botkit.getCookie('botkit_guid');
            connectEvent = 'welcome_back';
        } else {
            that.guid = that.generate_guid();
            Botkit.setCookie('botkit_guid', that.guid, 1);
        }

        that.socket.addEventListener('open', function (event) {
            console.log('CONNECTED TO SOCKET');
            that.reconnect_count = 0;
            that.trigger('connected', event);
            that.deliverMessage({
                type: connectEvent,
                user: that.guid,
                channel: 'socket',
                user_profile: that.current_user ? that.current_user : null,
            });
        });

        that.socket.addEventListener('error', function (event) {
            console.error('ERROR', event);
        });

        that.socket.addEventListener('close', function (event) {
            console.log('SOCKET CLOSED!');
            that.trigger('disconnected', event);
            if (that.reconnect_count < that.config.max_reconnect) {
                setTimeout(function () {
                    console.log('RECONNECTING ATTEMPT ', ++that.reconnect_count);
                    that.connectWebsocket(that.config.ws_url);
                }, that.config.reconnect_timeout);
            } else {
                that.message_window.className = 'offline';
            }
        });

        that.socket.addEventListener('message', function (event) {            
            var message = null;
            try {
                message = JSON.parse(event.data);
            } catch (err) {
                that.trigger('socket_error', err);
                return;
            }
            that.trigger(message.type, message);
        });
    },
    clearReplies: function () {
        this.replies.innerHTML = '';
    },
    quickReply: function (payload) {
        this.send(payload);
    },
    focus: function () {
        this.input.focus();
    },
    triggerScript: function (script, thread) {
        this.deliverMessage({
            type: 'trigger',
            user: this.guid,
            channel: 'socket',
            script: script,
            thread: thread
        });
    },
    identifyUser: function (user) {
        user.timezone_offset = new Date().getTimezoneOffset();
        this.guid = user.id;
        Botkit.setCookie('botkit_guid', user.id, 1);
        this.current_user = user;

        this.deliverMessage({
            type: 'identify',
            user: this.guid,
            channel: 'socket',
            user_profile: user,
        });
    },
    receiveCommand: function (event) {
        switch (event.data.name) {
            case 'trigger':
                console.log('TRIGGER', event.data.script, event.data.thread);
                Botkit.triggerScript(event.data.script, event.data.thread);
                break;
            case 'identify':
                console.log('IDENTIFY', event.data.user);
                Botkit.identifyUser(event.data.user);
                break;
            case 'connect':
                Botkit.connect(event.data.user);
                break;
            default:
                console.log('UNKNOWN COMMAND', event.data);
        }
    },
    sendEvent: function (event) {
        if (this.parent_window) {
            this.parent_window.postMessage(event, '*');
        }
    },
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie: function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    generate_guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },
    generate_id: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4();
    },
    boot: function (user) {
        var that = this;

        that.message_window = document.getElementById("message_window");
        that.message_list = document.getElementById("message_list");
        that.replies = document.getElementById('message_replies');
        that.input = document.getElementById('messenger_input');
        that.focus();

        that.on('connected', function () {
            that.message_window.className = 'connected';            
            that.input.disabled = false;
            that.sendEvent({
                name: 'connected'
            });
        })

        that.on('disconnected', function () {
            that.message_window.className = 'disconnected';
            that.input.disabled = true;
        });

        that.on('typing', function () {
            that.clearReplies();
            renderMessage({
                isTyping: true
            }, that);
        });

        that.on('message', function (message) {           
            renderMessage(message, that);        
            speak(message.text);
        });

        that.on('message', function (message) {
            that.clearReplies();
            renderQuickReplies(message, that);

            renderItemList(message, that);
        });

        if (window.self !== window.top) {
            that.parent_window = window.parent;
            window.addEventListener("message", that.receiveCommand, false);
            that.sendEvent({
                type: 'event',
                name: 'booted'
            });
            console.log('Messenger booted in embedded mode');
        } else {
            console.log('Messenger booted in stand-alone mode');
            that.connect(user);
        }

        return that;
    }
};


(function () {
    Botkit.boot();
})();