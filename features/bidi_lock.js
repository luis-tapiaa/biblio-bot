module.exports = function (controller) {
    controller.rasaHears('bloqueo_bidi', 'message, message_received', async (bot, message) => {
        sitio = controller.getEntity(message, 'sitio');
        if (sitio) {
            await bot.reply(message, 'Cuando sobrepasas el limite de descarga que es de 250 MB en 30 minutos, el' +
                'sistema te bloqueará de forma automática durante el mismo periodo de tiempo (30' +
                'minutos), con lo cual tendrás que reiniciar tu navegador y esperar dicho tiempo' +
                'para poder acceder a la bidi nuevamente.');
            await bot.reply(message, 'Además si compartes tu clave y contraseña de acceso remoto el sistema te' +
                'bloquea de forma automática, debido a que estas son personales e intransferibles.');
            await bot.reply(message, 'Si tienes dificultades para acceder a la bidi consulta al chat en línea o bien , manda' +
                'un correo a ar-bidi@dgb.unam.mx explicando tu problema.');
        }

    });
}
