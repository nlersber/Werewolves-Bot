const fs = require("fs");
const data = require("../data.json");
const ManagerBase = require("./ManagerBase");
const client = require("../index");

class ChannelManager extends ManagerBase {
  constructor() {
    super();
  }

  check() {
    let string = "";
    let counter = 0;

    // string=string+
    string = string + "Zijn alle kanalen ingesteld?\n";
    let hasStarted = data.hasStarted;
    if (!hasStarted || data.channels.guild) {
      string =
        string +
        "Het spel is nog niet gestart. Je kan het spel starten door in het inschrijfkanaal het command '$start' te gebruiken.\n";
      return string;
    }
    let guild = client.guilds.find(s => s.id === data.channels.guild);

    if (!!!guild) {
      string =
        string +
        "De server kan niet gevonden worden. Stuur een PM naar Nick zodat hij zijn shit fixt.";
      return;
    }

    //Inschrijving
    let channel = guild.channels.find(
      s => s.id === data.channels.inschrijf.inschrijfchannel
    );
    if (!!!channel) counter++;
    string =
      string +
      "Inschrijfkanaal:" +
      (!!channel
        ? `Naam=${channel.name}, ID=${channel.id}`
        : "Nog niet ingesteld! Normaal gebeurt dit bij '$start' in het inschrijfkanaal\n");

    //Leiding
    channel = guild.channels.find(s => s.id === data.channels.leiding);
    if (!!!channel) counter++;
    string =
      string +
      "Leidingskanaal:" +
      (!!channel
        ? `Naam=${channel.name}, ID=${channel.id}`
        : "Nog niet ingesteld! Je kan dit instellen door in het leidingskanaal '$setchannel leiding' te gebruiken.\n");

    //Stem
    channel = guild.channels.find(s => s.id === data.channels.stem);
    if (!!!channel) counter++;
    string =
      string +
      "Stemkanaal:" +
      (!!channel
        ? `Naam=${channel.name}, ID=${channel.id}`
        : "Nog niet ingesteld! Je kan dit instellen door in het stemmingskanaal '$setchannel stem' te gebruiken.\n");

    //Players
    channel = guild.channels.find(s => s.id === data.channels.players);
    if (!!!channel) counter++;
    string =
      string +
      "Deelnemerskanaal:" +
      (!!channel
        ? `Naam=${channel.name}, ID=${channel.id}`
        : "Nog niet ingesteld! Je kan dit instellen door in het deelnemerskanaal '$setchannel players' te gebruiken. Hier komt de lijst met deelnemers met nummer in.\n");

    //Roles
    channel = guild.channels.find(s => s.id === data.channels.roles);
    if (!!!channel) counter++;
    string =
      string +
      "Rollenkanaal:" +
      (!!channel
        ? `Naam=${channel.name}, ID=${channel.id}`
        : "Nog niet ingesteld! Je kan dit instellen door in het rollenkanaal bij de spelleidingskanalen '$setchannel roles' te gebruiken. Hier komen de spelers met hun rol in.\n");

    //Admin
    channel = guild.channels.find(s => s.id === data.channels.admin);
    if (!!!channel) counter++;
    string =
      string +
      "Spelleidingskanaal:" +
      (!!channel
        ? `Naam=${channel.name}, ID=${channel.id}`
        : "Nog niet ingesteld! Je kan dit instellen door in het spelleiderskanaal bij de spelleidingskanalen '$setchannel roles' te gebruiken. Hier komen de resultaten in.\n");

    string =
      string +
      "\nEindresultaten kanalen: " +
      (counter
        ? `Nog ${counter} ${
            counter === 1 ? "kanaal" : "kanalen"
          } in te stellen!`
        : "Alle kanalen zijn ingesteld!");

    return string;
  }

  checkSetup() {
    const a = data.channels;

    return (
      a.inschrijf.inschrijfchannel &&
      a.leiding &&
      a.stem &&
      a.players &&
      a.roles &&
      a.guild &&
      a.mededeling
    );
  }

  /**
   * Saves a channel to data.json
   * @param {number} channel ID of the channel, guild or user to save
   * @param {string} type What you're trying to save. Inschrijf, Leiding, Stem, Players, Roles, Guild, Admin.
   */
  saveChannel(channel, type) {
    switch (type.toLowerCase()) {
      case "inschrijf":
        data.channels.inschrijf.inschrijfchannel = channel;
        break;
      case "leiding":
        data.channels.leiding = channel;
        break;
      case "stem":
        data.channels.leiding = channel;
        break;
      case "players":
        data.channels.players = channel;
        break;
      case "roles":
        data.channels.roles = channel;
        break;
      case "guild":
        data.channels.guild = channel;
        break;
      case "mededeling":
        data.channels.mededeling = channel;
        break;
      default:
        return false;
    }

    fs.writeFileSync("../data.json", JSON.stringify(data));
    return true;
  }
}

const manager = new ChannelManager();
module.exports = manager;
