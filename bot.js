const Telegraf = require("telegraf");
const keys = require("./keys");
const bot = new Telegraf(keys.telegramKey);
const { startMsg } = require(".//utils/message");
const {
  startMarkup,
  indiaMarkup,
  stateMarkup,
  stateNameMarkup,
} = require(".//utils/markup");
const { default: axios } = require("axios");
const { stateList } = require("./utils/states");

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

bot.action(stateList, (ctx) => {
  const selectedState = ctx.match;
  axios.get("https://api.covid19india.org/data.json").then((data) => {
    const stateData = data.data.statewise.find((val) => {
      return val.state === selectedState;
    });
    let message = `
State:  ${selectedState}\n
Active Cases:  ${stateData.active}\n
Confirmed Cases:  ${stateData.confirmed}\n
Deaths:  ${stateData.deaths}\n
Recovered:  ${stateData.recovered}\n
New Cases : ${stateData.deltaconfirmed}\n
Last Update :  ${stateData.lastupdatedtime}
`;
    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: stateNameMarkup,
      },
    });
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
