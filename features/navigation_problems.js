module.exports = function (controller) {
    controller.rasaHears('identificacion_bidi', 'message, message_received', async (bot, message) => {
        sitio = controller.getEntity(message, 'sitio');

        switch (sitio) {
            case 'ebsco':
                await bot.reply(message, 'En la pantalla que te encuentras de tu lado izquierdo se encuentra el logo de la' +
                    'UNAM, debajo de él se encuentra el menú “Colecciones digitales” cuando te' +
                    'posicionas en él se despliegan las opciones, selecciona la que dice “Bases de' +
                    'datos”, te abrirá una nueva ventana.');
                await bot.reply(message, 'En el recuadro de busqueda coloca el nombre de la base de datos que quieres' +
                    'consultar o la temática, por ende el siguiente recuadro debe de estar en título o' +
                    'tema según sea el caso.');
                await bot.reply(message, 'Como resultado te mostrará los títulos de las bases de datos, las temáticas que' +
                    'maneja y del lado derecho el texto “acceso por …” le das doble clic y te te' +
                    'mostrará una interfaz en la cual tienes que ingresar tu acceso remoto (clave y' +
                    'contraseña) para poder acceder a la base de datos.');
                break;
            case 'scopus':
                await bot.reply(message, 'En la pantalla que te encuentras de tu lado izquierdo se encuentra el logo de la' +
                    'UNAM, debajo de él se encuentra el menú “Colecciones digitales” cuando te' +
                    'posicionas en él se despliegan las opciones, selecciona la que dice “Bases de' +
                    'datos”, te abrirá una nueva ventana.');
                await bot.reply(message, 'En el recuadro de busqueda coloca el nombre de la base de datos que quieres' +
                    'consultar o la temática, por ende el siguiente recuadro debe de estar en título o' +
                    'tema según sea el caso.');
                await bot.reply(message, 'Como resultado te mostrará los títulos de las bases de datos, las temáticas que' +
                    'maneja y del lado derecho el texto “acceso por …” le das doble clic y te te' +
                    'mostrará una interfaz en la cual tienes que ingresar tu acceso remoto (clave y' +
                    'contraseña) para poder acceder a la base de datos.');
                break;
            case 'uptodate':
                await bot.reply(message, 'Aun no se como responder a eso');
                break;
            default:
                await bot.reply(message, 'No se como acceder a eso');
        }

    });
}