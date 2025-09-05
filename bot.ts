import {Bot} from "grammy";

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
    await ctx.reply("Привет!\nСписок команд -> <code>/help</code>",
        { parse_mode: "HTML" });
});
// Handle other messages.
bot.command('help', async (ctx) => {
    await ctx.reply('<code>/id</code> - получить свой id\nНапиши <b>what did he say</b> в любом регистре - получил gif-мем',
        { parse_mode: "HTML" })
})
bot.command("id", async (ctx) => {
  await  ctx.reply(`Ваш chat_id:<b>${ctx.chat.id}</b>`,
      { parse_mode: "HTML" })
});
bot.hears(/ping/i, async (ctx) => {
    // `reply` - это псевдоним для `sendMessage` в том же чате (см. следующий раздел).
    await ctx.reply("pong");
});
bot.hears(/what did he say/i ,async (ctx) => {
    await ctx.replyWithAnimation("https://media.tenor.com/KM98YNR1lUYAAAAM/what-did.gif")
})
bot.on("message", (ctx) => ctx.reply("Извини,пока не понимаю что <s>за хуйню</s> ты написал",
    { parse_mode: "HTML" })  );

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.

bot.start();