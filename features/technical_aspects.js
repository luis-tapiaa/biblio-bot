module.exports = function (controller) {
    controller.rasaHears('libro_no_abre', 'message, message_received', async (bot, message) => {
        material = controller.getEntity(message, 'material');
        if (material === 'libro electronico') {
            await bot.reply(message, 'Si tu libro no abre lo que puedes hacer es...');
        } else {
            await bot.reply(message, '¿Que es lo que no abre?');
        }

    });

    controller.rasaHears('pagina_lenta', 'message, message_received', async (bot, message) => {
        sitio = controller.getEntity(message, 'sitio');

        if (sitio === 'bidi') {
            await bot.reply(message, 'Cuando la pagina esta lenta...');
        }

    });
}