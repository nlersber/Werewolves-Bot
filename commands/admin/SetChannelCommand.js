const { Command, CommandMessage } = require("discord.js-commando");
const { Discord } = require("discord.js");
const data = require("../../data.json");
const fs = require("fs");
const ChannelManager = require("../../Managers/ChannelManager");

module.exports = class SetChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: "setchannel",
      memberName: "setchannel",
      group: "admin",
      description: "Sets and stores a channel"
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

    if (!!!args) {
      message
        .reply(
          "Je moet hier een argument ingeven. Herbekijk de PM om te kijken welke mogelijkheden er zijn. Dit bericht wordt vanzelf verwijderd in 10 seconden.\n"
        )
        .then(s => s.delete(10000));
    }

    if (!ChannelManager.saveChannel(message.channel.id, args)) {
      message
        .reply(
          "Dit is geen geldig type. Herbekijk de PM om te kijken welke mogelijkheden er zijn. Dit bericht wordt vanzelf verwijderd in 10 seconden.\n"
        )
        .then(s => s.delete(10000));
      return;
    }
    message
      .reply(
        "Kanaal werd succesvol ingesteld als " +
          args.toLowerCase() +
          ". Dit bericht wordt vanzelf verwidjerd in 10 seconden, samen met het commando."
      )
      .then(s => {
        s.delete(10000).then(message.delete());
      });
  }
};
