var converter = new showdown.Converter();
converter.setOption('openLinksInNewWindow', true);

const typingIndicator = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;

renderMessage = function (message, that) {
    if (that.prevClass != message.type) {
        that.group = document.createElement('div');
        that.group.classList.add('group');
        that.message_list.appendChild(that.group);
    }

    if (!that.next_line) {
        that.next_line = document.createElement('div');
        that.group.appendChild(that.next_line);
    }
    if (message.text) {
        message.html = converter.makeHtml(message.text);
    }

    const content = message.isTyping ? typingIndicator : message.html;
    that.prevClass = message.type;

    that.next_line.innerHTML = `<div class="message ${message.type}">${content}</div>`

    if (!message.isTyping) {
        delete (that.next_line);
    } else {
        that.prevClass = 'message';
    }
}

renderQuickReplies = function (message, that) {
    if (message.quick_replies) {
        var list = document.createElement('ul');

        var elements = [];
        for (var r = 0; r < message.quick_replies.length; r++) {
            (function (reply) {

                var li = document.createElement('li');
                var el = document.createElement('a');
                el.innerHTML = reply.title;
                el.href = '#';

                el.onclick = function () {
                    that.quickReply(reply.payload);
                }

                li.appendChild(el);
                list.appendChild(li);
                elements.push(li);

            })(message.quick_replies[r]);
        }

        that.replies.appendChild(list);

        if (message.disable_input) {
            that.input.disabled = true;
        } else {
            that.input.disabled = false;
        }
    } else {
        that.input.disabled = false;
    }
}

renderItemList = function (message, that) {
    if (message.list) {
        if (!that.next_line) {
            that.next_line = document.createElement('div');
            that.group.appendChild(that.next_line);
        }
        if (message.list) {
            var list = document.createElement('ul');
            list.classList.add('item-list');

            var elements = [];
            for (var r = 0; r < message.list.length; r++) {
                (function (item) {

                    var li = document.createElement('li');
                    li.classList.add('item');
                    var title = document.createElement('div');
                    title.id = `item-${that.generate_id()}`
                    title.classList.add('item-title');
                    title.innerHTML = item.title;
                    title.onclick = function() {
                        title.className = title.className == 'item-title' ? 'item-title-full' : 'item-title';
                    }
                    var location = document.createElement('div');
                    location.classList.add('item-location');
                    location.innerHTML = item.location;

                    li.appendChild(title);
                    if (item.location) {
                        li.appendChild(location);
                    }
                    list.appendChild(li);
                    elements.push(li);

                })(message.list[r]);
            }

        }

        var wrap = document.createElement('div');
        wrap.appendChild(list);
        wrap.classList.add('message');
        wrap.classList.add('list');

        that.next_line.appendChild(wrap);

        if (!message.isTyping) {
            delete (that.next_line);
        }
    } else {
        that.input.disabled = false;
    }
}