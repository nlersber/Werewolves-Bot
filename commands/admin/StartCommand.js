const { Command, CommandMessage } = require("discord.js-commando");
const { Discord } = require("discord.js");
const data = require("../../data.json");
const fs = require("fs");

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
    data.inschrijfchannel = message.channel.id;
    fs.writeFileSync("../../data.json", JSON.stringify(data));

    message
      .delete()
      .then(
        s =>
          s.channel.send(
            "Inschrijven voor het volgende spel doe je door te reageren.\n\n" +
              "👍 als je actief wil meespelen.\n\n" +
              "👎 als je niet actief wil meedoen maar gewoon het spelverloop in het dodenchannel wil meevolgen."
          ) //Add reactions and limit to single reaction
      )
      .then(async s => {
        await s.react("👍");
        await s.react("👎");
      })
      .catch();
  }
};
