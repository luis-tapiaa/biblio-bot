module.exports = function (controller) {
    controller.rasaHears('obtener_cuenta', 'message, message_received', async (bot, message) => {
        await bot.say('Acceda a la página de DGB: http://www.bidi.unam.mx/index.php/acceso-remoto y clique sobre la leyenda “ALUMNOS UNAM; o, ACADÉMICOS UNAM”, si es su caso. En seguida aparecerá un formulario, siga las instrucciones que ahí aparecen.');
        await bot.say('Si usted pertenece al Sistema Abierto y Educación a Distancia (SUAYED), por favor póngase en contacto con el Coordinador de la Biblioteca de su Facultad; los datos de contacto pueden obtenerse desde el localizador del Sistema Bibliotecario de la UNAM:');
        await bot.say('Para Bachillerato: http://bibliotecas.unam.mx/index.php/bachillerato');
        await bot.say('Para Licenciatura y Posgrado: http://bibliotecas.unam.mx/index.php/licenciatura-y-posgrado');
    });
    
    controller.rasaHears('acceso_bidi', 'message, message_received', async (bot, message) => {
        await bot.say('En el centro de la pantalla se encuentra un rectángulo donde ingresan las palabras claves (autor, título, tema) al darle enter, abrirá una nueva pantalla en la cual aparecerán los resultados de tu búsqueda.');
        await bot.say('En la parte de abajo de la referencia se encontrará la leyenda “TEXTO COMPLETO”, al darle doble clic mostrará una interfaz en la cual tiene que ingresar tu acceso remoto (clave y contraseña) para poder acceder al documento');
    });

    controller.rasaHears('olvido_clave', 'message, message_received', async (bot, message) => {
        await bot.say('La clave de acceso remoto se puede recuperar en:');
        await bot.say('https://bidi.unam.mx/index.php/acceso-remoto');
        await bot.say('en la parte de abajo se encontrará el texto “recupera tu contraseña”, posteriormente, le llegará al correo que dado de alta de 10 a 15 min. Es recomendable revisar la bandeja de correo no deseado.');
    });

    controller.rasaHears('obtener_password_bidi', 'message, message_received', async (bot, message) => {
        await bot.say('Debe escribirle a la Lic. María Guadalupe Rojo Cázares a los mails:');
        await bot.say('biblioteca_cuaed@cuaed.unam.mx');
        await bot.say('guadalupe_rojo@cuaed.unam.mx');
    });

    controller.rasaHears('cambiar_correo', 'message, message_received', async (bot, message) => {
        await bot.say('Para cambiar su correo por favor envíe su comprobante de inscripción, credencial o identificación oficial, al siguiente correo:');
        await bot.say('ar-bidi@dgb.unam.mx');
        await bot.say('escribiendo el motivo por el cual se desea cambiar el correo');        
    });

    controller.rasaHears('acceso_externos', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'El servicio de Acceso Remoto (AR) es exclusivo para la comunidad UNAM con derechos vigentes. Sin embargo, la DGB brinda acceso libre a miles de recursos, por lo que le sugerimos explorar la página. Por ejemplo, usted puede consultar más de 400 mil tesis de todos los niveles y áreas del conocimiento que se imparten en la UNAM. No tiene que pagar nada, ni registrarse.');
    });

    controller.rasaHears('vigencia_tesis', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'Acuda al Coordinador de la Biblioteca de su Plantel. Él lo orientará al respecto.');
    });

    
}