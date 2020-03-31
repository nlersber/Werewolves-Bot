const { Command, CommandMessage } = require("discord.js-commando");
const { Discord } = require("discord.js");
const data = require("../../data.json");
const fs = require("fs");
const ChannelManager = require("../../Managers/ChannelManager");

module.exports = class StartCommand extends Command {
  constructor(client) {
    super(client, {
      name: "start",
      memberName: "start",
      group: "admin",
      description: "Starts the game."
    });
  }

  run(message, args) {
    if (message.guild.owner.id !== message.author.id) {
      message
        .reply(
          "Enkel de eigenaar van de server kan dit commando gebruiken. Dit bericht wordt vanzelf verwijderd binnen 10 seconden.\n"
        )
        .then(s => s.delete(10000));
      return;
    }

    data.admin = message.author.id;
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
        data.channels.inschrijf.inschrijfmessage = s.id;
        ChannelManager.saveChannel(message.channel.id, "inschrijf");
        // data.channels.inschrijf.inschrijfchannel = message.channel.id;
        data.hasStarted = true;

        fs.writeFileSync("../../data.json", JSON.stringify(data));
        ChannelManager.saveChannel(message.message.guild.id, "guild");
      })
      .catch();

    message.author.send(
      "Nu moeten de deadlines ingesteld worden. Dit doe je via de command $deadline {date}.\n " +
        "De date moet geformateerd zijn volgens '2011-10-10T14:48:00'. Jaar-maand-dag Uur:minuten:seconden, aan elkaar geplakt met een 'T'.\n" +
        "Dit doe je in het kanaal waar de deadlines zullen komen. Het commando wordt verwijderd en vervangen door een bericht met de deadline in.\n" +
        "Na het verlopen van de deadline, worden deze vanzelf doorschrapt.\n\n" +

        "Ook moeten er bepaalde kanalen ingesteld worden. Dit doe je via het '$setchannel' commando. De correcte syntax hiervan is '$setchannel type'.\nNaast elk kanaal hieronder staat het type dat ingegeven moet worden.\nDeze kanalen moeten worden ingesteld:\n" +
        "Het inschrijfkanaal is al ingesteld. Dit veranderen doe je door het '$start' commando in een ander kanaal te gebruiken.\n" +
        "Deelnemerskanaal (players): hierin komt de lijst met deelnemers.\n" +
        "Leidingskanaal (leiding): hierin komt het resultaat van elke dag/nacht/stemming. Dit zet je admin-only.\n" +
        "Stemmingskanaal (stem): hierin wordt er gestemd. Het resultaat wordt in het leidingskanaal gemeld.\n" +
        "Mededelingen (mededeling): hierin zal de bot eenmalig instructies geven over het verloop voor de spelers. Hier staat ook de uitleg over hoe acties moeten uitgevoerd worden.\n" +
        "Rollenkanaal (roles): hierin komt de rolverdeling per speler. Dit zet je admin-only.\n\n" +
        "Je kan altijd de status checken via het '$check' commando. Dit controleert of alles deftig is ingesteld en wat er nog gedaan moet worden.\n" +
        "Eenmaal alles gereed is, moet je niets meer doen. Het spel begint vanzelf te lopen vanaf de eerste deadline aanbreekt.\n" +
        "Het systeem werkt met 3 types deadlines: inschrijvingen, burgemeesterspeeches, cyclus. Cyclus omvat de stemmingen en de acties. Zo'n deadline kan dag of nacht zijn."
    );
  }
};
