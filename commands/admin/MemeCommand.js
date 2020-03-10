const { Command } = require("discord.js-commando");
const { MessageAttachment} = require("discord.js");

module.exports = class StartCommand extends Command {
  constructor(client) {
    super(client, {
      name: "werkloos",
      memberName: "werkloos",
      group: "admin",
      description: "Memes tf out of the discord channel"
    });
  }

run(message, args) {
    const attachment = new MessageAttachment('https://i.imgur.com/YFCGOQW.png');

    return message.channel.send("test");
  }
};
