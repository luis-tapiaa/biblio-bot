const path = require('path');

module.exports = function (controller) {
    controller.publicFolder('/', path.join(__dirname, '..', 'public'));

    controller.on('hello, welcome_back', async (bot, message) => {
        await bot.reply(message, 'Bienvenido!! En que puedo ayudarte.');
    });

    controller.on('message, message_received', async (bot, message) => {
        await bot.reply(message, 'Aun no se como responder a eso, puedes hacer otra pregunta.');
    });

    console.log('Chat with me: http://localhost:' + (process.env.PORT || 3000));
}