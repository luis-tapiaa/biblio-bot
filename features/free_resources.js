module.exports = function (controller) {
    controller.rasaHears('recursos_externos', 'message, message_received', async (bot, message) => {
        await bot.reply(message, 'Los recursos para externos son...');
    });
}