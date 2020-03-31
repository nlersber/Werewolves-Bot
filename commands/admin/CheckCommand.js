const { Command, CommandMessage } = require("discord.js-commando");
const { Discord } = require("discord.js");
const data = require("../../data.json");
const fs = require("fs");
const CheckManager = require("../../Managers/CheckManager");

module.exports = class CheckCommand extends Command {
  constructor(client) {
    super(client, {
      name: "check",
      memberName: "check",
      group: "admin",
      description: "Checks if the setup was done correctly"
    });
  }

  run(message, args) {
    if (message.guild.owner.id !== message.author.id) {
      message
        .reply(
          "Alleen de eigenaar van de server kan dit commando gebruiken.\nDit bericht wordt vanzelf verwijderd in 10 seconden.\n"
        )
        .then(s => s.delete(10000));
      return;
    }

    if (!!args) {
      message
        .reply(
          "Je moet hier geen argument ingeven. Dit bericht wordt vanzelf verwijderd in 10 seconden.\n"
        )
        .then(s => s.delete(10000));
      return;
    }

    message.channel.send(CheckManager.check());
  }
};
