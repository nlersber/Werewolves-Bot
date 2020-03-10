const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class StartCommand extends Command {
  constructor(client) {
    super(client, {
      name: "start",
      memberName: "start",
      group: "admin",
      description: "Starts the game"
    });
  }

  run(message, args) {
    if (!args || !args.length || args.length !== 1) return;
    let channelid = args[0];
  }
};
