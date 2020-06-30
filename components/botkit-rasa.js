const request = require('request-promise')

module.exports = ({ uri }) => ({
    receive: async (bot, message, next) => {
        if (!message.text || message.is_echo || message.bot_id) {
            next();
            return;
        }

        const { intent, entities } = await request({
            method: 'POST',
            uri: `${uri}/parse`,
            body: { text: message.text },
            json: true
        });

        message.intent = intent;
        message.entities = entities;

        next();
    }
});
