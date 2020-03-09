const Discord = require("discord.js");
const settings = require("./settings.json");

const bot = new Discord.Client({disableEveryone: true});

bot.login(settings.token)