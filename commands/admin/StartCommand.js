const { Command, CommandMessage } = require("discord.js-commando");
const { Discord } = require("discord.js");

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
    message
      .delete()
      .then(s =>
        s.channel.send(
          "Inschrijven voor het volgende spel doe je door te reageren.\n" +
            "👍 als je actief wil meespelen.\n" +
            "👎 als je niet actief wil meedoen maar gewoon het spelverloop in het dodenchannel wil meevolgen."
        )//Add reactions and limit to single reaction
      ).catch()
  }
};
