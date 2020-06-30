module.exports = function (controller) {
    controller.rasaHears('acceso_bidi', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'En el centro de la pantalla se encuentra un rectángulo donde ingresas ' +
            'tus palabras claves (autor, título, tema) al darle enter, te abrira una nueva pantalla en la ' +
            'cual te aparecerán los resultados de tu bùsqueda. \n\nEn la parte de abajo de la referencia que ' +
            'te interesa se encuentra la leyenda texto completo, al darle doble clic te mostrará una interfaz ' +
            'en la cual tienes que ingresar tu acceso remoto (clave y contraseña) para poder acceder al ' +
            'documento.');
    });

    controller.rasaHears('olvido_clave', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'La clave de acceso remoto la puedes recuperar en el [siguiente enlace]' +
            '(https://bidi.unam.mx/index.php/acceso-remoto) en la parte de abajo se encuentra el texto ' +
            '“recupera tu contraseña” te llegará al correo que diste de alta de 10 a 15 min. puede llegar a ' +
            'la bandeja de correo no deseado.');
    });

    controller.rasaHears('obtener_password_bidi', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'Debe escribirle a la Lic. María Guadalupe Rojo Cázares a los mails:\n\n' +
            'E-mail:\n\nbiblioteca_cuaed@cuaed.unam.mx\n\nguadalupe_rojo@cuaed.unam.mx');
    });

    controller.rasaHears('cambiar_correo', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'Para cambiar tu correo tienes que mandar tu comprobante de inscripciòn, ' +
            'credencial o identificaciòn oficial, al siguiente correo ar-bidi@dgb.unam.mx escribiendo el ' +
            'motivo por el cual deseas cambiar el correo.');
    });

    controller.rasaHears('acceso_externos', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'Si eres externo...');
    });

    controller.rasaHears('duracion_libro', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'Un libro dura...');
    });

    controller.rasaHears('obtener_base_datos', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'Para obtener bases de datos...');
    });

    controller.rasaHears('correo_no_llega', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'Si un correo no llega...');
    });
}