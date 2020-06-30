const { BotkitConversation } = require("botkit");

module.exports = function (controller) {

    const replies = {
        libros: ['En el centro de la pantalla se encuentra un rectángulo donde ingresas tus' +
            'palabras claves (autor, título, tema) al darle enter, te abrira una nueva pantalla' +
            'en la cual te aparecerán los resultados de tu bùsqueda.',
        'Del lado izquierdo aparecerá la leyenda “depurar resultados” más abajo de este' +
        'texto encontraras “tipos de recursos” en el puedes seleccionar el tipo de' +
        'documento que deseas, en este caso Libros.', 'En la parte de abajo de la referencia que te interesa se encuentra la leyenda' +
        'texto completo, al darle doble clic, te mostrará una interfaz en la cual tienes que' +
        'ingresar tu acceso remoto (clave y contraseña) para poder acceder al' +
        'documento.', 'cada proveedor de información tiene su políticas y restricciones para consultar o' +
        'descargar los documentos'],
        tesis: ['Las tesis las puedes consultar [aqui](http://oreon.dgbiblio.unam.mx/F/?func=find-b0&local_base=tesbidi)',
            'En el centro de la pantalla se encuentra un rectángulo de búsqueda básica' +
            'donde ingresas tus palabras claves (sustentante, título, tema) al darle enter, te' +
            'mostrará los resultados de tu búsqueda, del lado derecho se encuentra la' +
            'leyenda “texto completo”, al darle doble clic te abrirá una nueva ventana con la' +
            'tesis, que puedes descargar si es de tu interés.',
            'Si tienes dificultades para acceder a la tesis consulta al chat en línea de la bidi.'],
        revistas: ['En el centro de la pantalla se encuentra un rectángulo donde ingresas tus' +
            'palabras claves (autor, título, tema) al darle enter, te abrira una nueva pantalla' +
            'en la cual te aparecerán los resultados de tu bùsqueda.',
        'Del lado izquierdo aparecerá la leyenda “depurar resultados” más abajo de este' +
        'texto encontraras “tipos de recursos” en el puedes seleccionar el tipo de' +
        'documento que deseas, en este caso artículos.',
        'En la parte de abajo de la referencia que te interesa se encuentra la leyenda' +
        'texto completo, al darle doble clic, te mostrará una interfaz en la cual tienes que' +
        'ingresar tu acceso remoto (clave y contraseña) para poder acceder al documento.']
    }

    let downloads = new BotkitConversation('downloads', controller);

    downloads.ask({
        text: '¿Que tipo de material deseas descargar?',
        quick_replies: [
            { title: 'Libros', payload: 'libros' },
            { title: 'Tesis', payload: 'tesis' },
            { title: 'Articulos', payload: 'articulos' }
        ],
        disable_input: true
    }, [], 'material');
    downloads.onChange('material', async (response, convo, bot) => {
        switch (response) {
            case 'libros':
            case 'tesis':
            case 'revistas':
                replies[response].forEach(reply => {
                    bot.say(reply);
                });
                break;
        }
    });

    controller.addDialog(downloads);

    controller.rasaHears('descargas', 'message, message_received', async (bot, message) => {
        material = controller.getEntity(message, 'material');

        switch (material) {
            case 'libros':
            case 'tesis':
            case 'revistas':
                replies[material].forEach(async reply => {
                    await bot.reply(message, reply);
                });
                break;
            case undefined:
                await bot.beginDialog('downloads', material);
                break;
            default:
                await bot.reply(message, 'El material que deseas descargar no esta disponible');
        }
    });
}