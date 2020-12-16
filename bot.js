const { Botkit } = require('botkit');
const { WebAdapter } = require('botbuilder-adapter-web');
require('dotenv').config();

const { RASA_URI } = process.env;
const rasa = require('./components/botkit-rasa')({ uri: RASA_URI });

const adapter = new WebAdapter({});
const controller = new Botkit({
    webhook_uri: '/api/messages',
    adapter,    
});

controller.getEntity = (message, entity) => {
    const entities = message. entities || [];
    return (entities.find(e => e.entity === entity) || {}).value;
}

controller.rasaHears = (text, type, callback) => {
    controller.hears(async ({ intent }) => {
        return intent.name === text && intent.confidence > 0.5;
    }, type, callback);
}
controller.middleware.receive.use(rasa.receive);
controller.ready(() => {
    controller.loadModules(__dirname + '/features');
});
