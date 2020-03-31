const fs = require("fs");
const data = require("../data.json");
const ManagerBase = require("./ManagerBase");
const client = require("../index");

class UserManager extends ManagerBase {
  constructor() {
    super();
  }

  addActiveUser(user) {
    data.players.push(user);

    fs.writeFileSync("./data.json", JSON.stringify(data));
    console.log(data);
  }

  check() {
    let string = "Zijn alle nodige gebruikers ingesteld?\n";
    let user = data.admin;
    string = string + "Admin: ";
    if (!!!user || !!!data.channels.guild) {
      string =
        string +
        "Er is nog geen admin of server ingesteld. Dit kan je doen door het spel te starten door in het inschrijfkanaal $'start' te gebruiken. Slechts 1 gebruiker kan admin zijn en de setup doen.\n";
      return string;
    }
    
    user = client.guilds
      .find(s => s.id === data.channels.guild)
      .members.find(s => s.id === data.admin);

    string =
      string +
      `Naam= ${user.displayName}, Account name= ${user.name}, ID= ${user.id}\n`;

    return string;
  }
}

const manager = new UserManager();
module.exports = manager;
