const Telegraf = require("telegraf");
const bot = new Telegraf("1853133317:AAFh8rRWNVztKf_YGY_y7qQb5m9ZFhtPKRk");
const { startMsg } = require(".//utils/message");
const { startMarkup, indiaMarkup, stateMarkup } = require(".//utils/markup");
const { default: axios } = require("axios");

bot.command("start", (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, startMsg, {
    reply_markup: {
      inline_keyboard: startMarkup,
    },
  });
});

bot.action("india", (ctx) => {
  axios.get("https://api.covid19india.org/data.json").then((data) => {
    let message = `
Active Cases:  ${data.data.statewise[0].active}\n
Confirmed Cases:  ${data.data.statewise[0].confirmed}\n
Deaths:  ${data.data.statewise[0].deaths}\n
Recovered:  ${data.data.statewise[0].recovered}\n
Last Update :  ${data.data.statewise[0].lastupdatedtime}
`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: indiaMarkup,
      },
    });
  });
});

bot.action("state", (ctx) => {
  ctx.deleteMessage();
  ctx.telegram.sendMessage(ctx.chat.id, "Enter State", {
    reply_markup: {
      inline_keyboard: stateMarkup,
    },
  });
});

bot.action("start", (ctx) => {
  ctx.deleteMessage();
  ctx.telegram.sendMessage(ctx.chat.id, startMsg, {
    reply_markup: {
      inline_keyboard: startMarkup,
    },
  });
});

bot.launch();
