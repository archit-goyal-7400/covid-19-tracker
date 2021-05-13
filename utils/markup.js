exports.startMarkup = [
  [
    { text: "India", callback_data: "india" },
    { text: "State", callback_data: "state" },
  ],
  [{ text: "Bot Info", callback_data: "bot-info" }],
];

exports.indiaMarkup = [[{ text: "Back to Start", callback_data: "start" }]];

const stateMarkupCalc = () => {
  const markup = [];
  const { stateList } = require("./states");
  for (let i = 0; i < stateList.length; i += 3) {
    const secondArray = [];
    for (let j = 0; j < 3; j++) {
      secondArray.push({
        text: stateList[i + j],
        callback_data: stateList[i + j],
      });
    }
    markup.push(secondArray);
  }
  markup.push([{ text: "Back to Start", callback_data: "start" }]);
  return markup;
};

exports.stateMarkup = stateMarkupCalc();

exports.stateNameMarkup = [
  [{ text: "Back to States", callback_data: "state" }],
  [{ text: "Back to Start", callback_data: "start" }],
];

exports.botInfoMarkup = [
  [
    { text: "Credits", callback_data: "credits" },
    { text: "Developer", callback_data: "dev" },
  ],
  [{ text: "Back to Start", callback_data: "start" }],
];

exports.afterInfoMarkup = [
  [{ text: "Bot Info", callback_data: "bot-info" }],
  [{ text: "Back to Start", callback_data: "start" }],
];
