module.exports = function (controller) {
    controller.rasaHears('formato_tesis', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'No, sólo la versión digital.');
    });

    controller.rasaHears('programas_tesis', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'No necesariamente, puedes entregar un archivo pdf para cada tipo de documento que utilizaste, especificando claramente el orden que tiene la tesis, Archivo1, Archivo 2, etc. y generar una carpeta comprimida (ZIP) con nombre "tesis"');
    });

    controller.rasaHears('complemento_tesis', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'No, lo puedes entregar en varios archivos pdf, especificando claramente el orden de cada uno de ellos y genera una carpeta comprimida (ZIP) con nombre "tesis".');
    });

    controller.rasaHears('autores_tesis', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'Si, es un trámite personal y es necesario marcar la opción de "Tesis Conjunta" en el registro de Generación de No Adeudo.');
    });
}