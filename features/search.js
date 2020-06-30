const { BotkitConversation } = require("botkit");

module.exports = function (controller) {

    let search = new BotkitConversation('search', controller);
    search.ask({
        text: '¿Que tipo de material estas buscando?',
        quick_replies: [
            { title: 'Libros', payload: 'libros' },
            { title: 'Tesis', payload: 'tesis' },
            { title: 'Articulos', payload: 'articulos' }
        ],
        disable_input: true
    }, [], 'material');
    search.ask({
        text: `¿Que tema de {{vars.material}} estas buscando?`,
    }, async (response, convo, bot) => {
        await bot.reply(convo.vars, { type: 'typing' });
        const data = await controller.mysql.get(convo.vars.material, response);
        await bot.changeContext(convo.vars.reference);
        if (data.length) {
            await bot.say({
                text: `Encontre los siguientes resultados:`,
                list: data.map(d => ({ title: d.titulo, location: d.clasificacion }))
            });
        } else {
            await bot.say(`No encontre resultados para tu busqueda`);
        }
    }, 'search_phrase');

    controller.addDialog(search);

    controller.rasaHears('busqueda', 'message, message_received', async (bot, message) => {
        material = controller.getEntity(message, 'material');
        search_phrase = controller.getEntity(message, 'search_phrase');

        switch (material) {
            case undefined:
                await bot.beginDialog('search', message);
                break;
            default:
                if (search_phrase) {
                    await bot.reply(message, { type: 'typing' });
                    const data = await controller.mysql.get(material, search_phrase);
                    await bot.changeContext(message.reference);
                    if (data.length) {
                        await bot.say({
                            text: `Encontre los siguientes resultados:`,
                            list: data.map(d => ({ title: d.titulo, location: d.clasificacion }))
                        });
                    } else {
                        await bot.say(`No encontre resultados para tu busqueda`);
                    }
                }
                return;
        }
    });
}
