import { Bot } from "grammy";
// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot("7553484017:AAE59BUQoHZRohNGqOP7X0Hc6ezNiJV6MCg"); // <-- put your bot token between the ""
// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.
// (async () => {
//     await bot.api.sendMessage(
//         737039161,
//         '<b>Привет!</b> <i>Добро пожаловать</i> в <a href="https://grammy.dev">grammY</a>.',
//         { parse_mode: "HTML" }
//     );
// })();
// Handle the /start command.
bot.command("start", async (ctx) => {
    await ctx.reply("Привет!\nСписок команд -> <code>/help</code>", { parse_mode: "HTML" });
});
// Handle other messages.
bot.command('help', async (ctx) => {
    await ctx.reply('<code>/id</code> - получить свой chat-id\nНапиши <b>what did he say</b> в любом регистре - получил gif-мем' +
        '\n<code>/remind</code> время(с/м/ч/д) сообщение - получить напоминание через определённое время.', { parse_mode: "HTML" });
});
bot.command("id", async (ctx) => {
    await ctx.reply(`Ваш chat_id:<b>${ctx.chat.id}</b>`, { parse_mode: "HTML" });
});
bot.hears(/ping/i, async (ctx) => {
    // `reply` - это псевдоним для `sendMessage` в том же чате (см. следующий раздел).
    await ctx.reply("pong");
});
bot.hears(/what did he say/i, async (ctx) => {
    await ctx.replyWithAnimation("https://media.tenor.com/KM98YNR1lUYAAAAM/what-did.gif");
});
bot.command('remind', async (ctx) => {
    const parts = ctx.message.text.split(" ");
    if (parts.length < 2) {
        return ctx.reply('Используй так: <code>/remind</code> 10с/м/ч/д сообщение', { parse_mode: "HTML" });
    }
    const time = parts[1];
    const text = parts.slice(2).join(' ') || 'Напоминание!';
    const match = time.match(/^(\d+)([smhdсмчд])$/);
    if (!match) {
        return ctx.reply('Неправильный формат! Используй число + с/м/ч/д + сообщение.');
    }
    const value = parseInt(match[1], 10);
    const unit = match[2];
    let delay = 0;
    switch (unit) {
        case 'с':
            delay = value * 1000;
            break;
        case 'м':
            delay = value * 1000 * 60;
            break;
        case 'ч':
            delay = value * 1000 * 60 * 60;
            break;
        case 'д': delay = value * 1000 * 60 * 60 * 24;
    }
    ctx.reply(`Ок, напомню через ${value} ${unit}.`);
    setTimeout(() => {
        ctx.reply(`Напоминаю: ${text}`);
    }, delay);
});
bot.on("message", (ctx) => ctx.reply("Извини,пока не понимаю что ты написал.У меня лапки)"));
// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.
// Start the bot.
bot.start();
//# sourceMappingURL=bot.js.map