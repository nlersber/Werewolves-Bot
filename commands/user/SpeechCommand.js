const { Command, CommandMessage } = require("discord.js-commando");
const { Discord } = require("discord.js");
const data = require("../../data.json");
const fs = require("fs");
const CheckManager = require("../../Managers/CheckManager");
const saveData = require("../../Tools/DataSaver");

module.exports = class CheckCommand extends Command {
  constructor(client) {
    super(client, {
      name: "speech",
      memberName: "speech",
      group: "user",
      description: "Sets a burgemeester speech for a user"
    });
  }

  /**
   * Runs the command
   * @param {CommandMessage} message Complete message object for this Command.
   * @param {string} args Argument of this commando. Only check if remove was used. Else take it as a whole as the speech.
   */
  run(message, args) {
    //Check if command was sent as DM to bot
    if (message.channel.type !== "dm") {
      message
        .delete()
        .then(s =>
          message
            .reply(
              "Dit moet je via PM naar de bot sturen. Dit bericht wordt vanzelf verwijderd binnen 10 seconden."
            )
            .then(s => s.delete(100000))
        );
      return;
    }

    //Check if argument was provided
    if (!!!args) {
      message
        .reply(
          "Je moet hier een speech ingeven. Als je dit commando 2 keer na elkaar gebruikt, wordt de text aan de vorige toegevoegd.\nAls je de speech opnieuw wil insturen, kan je dat doen via het commando '$speech remove'. Je kan daarna gewoon opnieuw een speech toevoegen. Dit bericht wordt vanzelf verwijderd in 10 seconden.\n"
        )
        .then(s => s.delete(10000));
      return;
    }

    //Check if user wants to reset their speech
    let firstarg = args.split(" ")[0].toLowerCase();
    if (firstarg === "remove") {
      data.speeches = data.speeches.filter(
        s => s.user.id !== message.author.id
      );
      saveData(data);
      return;
    }

    //Add User and speach to data.speeches as {"user": message.author.id, "speech": args}
    let speech = data.speeches.find(s => s.user === message.author.id);

    //If a prior speech is present
    if (!!speech) speech.speech = speech.speech + " " + args;
    //No prior speech present, add new speech
    else data.speeches.push({ user: message.author.id, speech: args });

    //Save data
    saveData(data);

    
    console.log(args);
  }
};
