const Discord = require("discord.js");
const settings = require("./settings.json");
const path = require("path");
const commando = require("discord.js-commando");

const client = new commando.CommandoClient({
  owner: "686344322089615387", // Your ID here.
  commandPrefix: "$", // The prefix of your bot.
  unknownCommandResponse: false // Set this to true if you want to send a message when a user uses the prefix not followed by a command
});

client.on('ready', () => {
    console.log('Yup');
})


client.registry.registerDefaults();

client.login(settings.token);
