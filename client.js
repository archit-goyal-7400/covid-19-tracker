const express = require("express");
const bodyParser = require("body-parser");
const packageInfo = require("./package.json");

const app = express();
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.json({ version: packageInfo.version });
});

var server = app.listen(process.env.PORT);

module.exports = (bot) => {
  app.post("/" + bot.token, (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
  });
};
