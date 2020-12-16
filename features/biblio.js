module.exports = function (controller) {
    controller.rasaHears('horario_biblioteca', 'message, message_received', async (bot, message) => {
        await bot.reply(message, '08:30 hrs a 21:30 hrs');
    });

    controller.rasaHears('servicios_biblioteca', 'message, message_received', async (bot, message) => {
        const servicios = [
            'Registro de usuarios',
            'Préstamo en sala, a domicilio, interbibliotecario y autopréstamo.' ,
            'Renovación de préstamo por vía internet, telefónica, en el módulo de autopréstamo',
            'Constancia de no adeudo para el trámite de titulación',
            'Bases de datos (acceso a 174 de bases de datos referenciales y de texto completo)',
            'Servicio de documentación',
            'Búsqueda de citas',
            'Búsqueda especializada',
            'Servicio para personas con Discapacidad'
        ];
        await bot.say({
            text: `Los servicios con los que cuenta la biblioteca son:`,
            list: servicios.map(s => ({ title: s }))
        });
    });

    controller.rasaHears('colecciones_bilioteca', 'message, message_received', async (bot, message) => {
        const colecciones = ['Colección General',
        'Publicaciones Periódicas',
        'Obras de consulta',
        'Tesis',
        'Colecciones Especiales',
        'Bases de Datos',
        'Fondo Antiguo'];

        await bot.say({
            text: `Las colecciones que hay en la biblioteca son: `,
            list: colecciones.map(c => ({ title: c }))
        });
    });

    controller.rasaHears('prestamos_biblioteca', 'message, message_received', async (bot, message) => {
        const restricciones = [
            'Todas aquellas obras que tengan una antigüedad superior a los 100 años.',
            'Obras de referencia, tales como enciclopedias, diccionarios, atlas, mapas y planos, obras de consulta, repertorios bibliográficos y similares.',
            'Publicaciones periódicas y revistas científicas de cualquier índole.',
            'Todos aquellos materiales que posean un singular valor por sus características tipográficas, de encuadernación, ilustraciones o edición.',
            'Aquellos manuales que, temporal o definitivamente, se considere que no deban salir de la Biblioteca.',
            'Las Tesis, Tesinas, Trabajos de Investigación, Memorias, Proyectos y similares, que no hayan sido editados ni tengan autorizada documentalmente su edición.'
        ];

        await bot.say({
            text: `Toda la bibliografía que se encuentra registrada en el Catálogo en Línea puede ser objeto de préstamo. No obstante, existen restricciones tales como:`,
            list: restricciones.map(r => ({ title: r }))
        });
    });
}