const { Command, CommandMessage } = require("discord.js-commando");
const { Discord } = require("discord.js");
//const data = require("../../data.json");
const fs = require("fs");
const emitter = require("../../models/DataEmitter");

module.exports = class DeadlineCommand extends Command {
  constructor(client) {
    super(client, {
      name: "deadline",
      memberName: "deadline",
      group: "admin",
      description: "Sets a deadline"
    });
  }

  run(message, args) {
    
    if (message.guild.owner.id !== message.author.id) {
      message
        .reply(
          "You are not the owner of this server. Only the owner can use this command.\nThis message will be deleted in 10 seconds.\n"
        )
        .then(s => s.delete(10000));
      return;
    }

    if (!data.hasStarted) {
      message.reply(
        "Je moet eerst het spel opstarten voordat je deadlines kan toevoegen. Dit doe je door in het kanaal voor de inschrijvingen het commando '$start' te gebruiken.\n"
      );
      return;
    }

    args = args.split(" ");

    if (!!!args || !Array.isArray(args)) {
      message.reply(
        "Dit commando heeft 2 of 3 argumenten nodig: het type (inschrijving, burgemeesterspeech, dag, nacht), eventueel een nummer (dag+nacht) en een correcte datum. Bekijk de PM voor de juiste formatting."
      );
      return;
    }

    message.delete().then(() => {
      let type = "";
      let data = {};

      type = args[0];
      data.author = message.author;

      switch (args.length) {
        case 2:
          data.datestring = args[1];
          break;
        case 3:
          data.number = args[1];
          data.datestring = args[2];
          break;
      }

      emitter.emit(type, data);
    });
  }
};
