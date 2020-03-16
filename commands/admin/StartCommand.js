const { Command, CommandMessage } = require("discord.js-commando");
const { Discord } = require("discord.js");
const data = require("../../data.json");
const fs = require("fs");
const UserManager = require("../../Managers/UserManager");

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
    //console.log(message);
    message
      .delete()
      .then(s =>
        s.channel.send(
          "Inschrijven voor het volgende spel doe je door te reageren.\n\n" +
            "👍 als je actief wil meespelen.\n\n" +
            "👎 als je niet actief wil meedoen maar gewoon het spelverloop in het dodenchannel wil meevolgen."
        )
      )
      .then(async s => {
        //Adds reactions

        await s.react("👍"); //👍
        await s.react("👎"); //👎
        //Stores message data
        data.inschrijf.inschrijfmessage = s.id;
        data.inschrijf.inschrijfchannel = message.channel.id;
        data.hasStarted = true;
        fs.writeFileSync("../../data.json", JSON.stringify(data));
        UserManager.setGuild(message.message.guild)
      })
      .catch();

    // message.author.send(
    //   "Nu moeten de deadlines ingesteld worden. Dit doe je via de command $deadline {date}.\n "
    //   + "De date moet geformateerd zijn volgens '2011-10-10T14:48:00'. Jaar-maand-dag Uur:minuten:seconden, aan elkaar geplakt met een 'T'.\n"
    //   + "Dit doe je in het kanaal waar de deadlines zullen komen. Het commando wordt verwijderd en vervangen door een bericht met de deadline in.\n"
    //   + "Na het verlopen van de deadline, worden deze vanzelf doorschrapt."
    // );
  }
};
