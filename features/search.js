module.exports = function (controller) {
    controller.rasaHears('busqueda', 'message, message_received', async (bot, message) => {
        await bot.say('En el centro de la pantalla se encuentra un rectángulo donde ingresas tus palabras claves (autor, título, tema) al darle enter, abrirá una nueva pantalla en la cual aparecerán los resultados de la búsqueda. ');
        await bot.say('Del lado izquierdo aparecerá la leyenda “depurar resultados” más abajo de este texto encontrará “tipos de recursos” en el puede seleccionar el tipo de documento que desea, en este caso libros');
        await bot.say('En la parte de abajo de la referencia se encontrará la leyenda “TEXTO COMPLETO”, al darle doble clic mostrará una interfaz en la cual tiene que ingresar tu acceso remoto (clave y contraseña) para poder acceder al documento');
    });

}