const Discord = require("discord.js"); //Discord api
const settings = require("./settings.json"); //Contains token and prefix
const path = require("path");
const commando = require("discord.js-commando"); //Discord command API
const data = require("./data.json"); //Contains data. Players, roles, etc
const fs = require("fs"); //File-system, used to write to json

const client = new commando.CommandoClient({
  owner: "686344322089615387", // Your ID here.
  commandPrefix: "$", // The prefix of your bot.
  unknownCommandResponse: false // Set this to true if you want to send a message when a user uses the prefix not followed by a command
});

client.on("ready", () => {
  console.log("Yup");
  clearData();
  initData();
  console.log(data);
});

//initData();

client.registry.registerDefaults();

client.login(settings.token);

function initData() {
  console.log(!!data);
  console.log(data.roles);
  if (!!data && !!!data.roles.length) {
    console.log("Pushing");
    data.roles.push(new GameRole(ROLENAME[1], ALIGNMENT[1], ACTIONTIMING[5]));
    data.roles.push(new GameRole(ROLENAME[2], ALIGNMENT[1], ACTIONTIMING[2]));
    data.roles.push(new GameRole(ROLENAME[3], ALIGNMENT[1], ACTIONTIMING[6]));
    data.roles.push(new GameRole(ROLENAME[4], ALIGNMENT[1], ACTIONTIMING[6]));
    data.roles.push(new GameRole(ROLENAME[5], ALIGNMENT[1], ACTIONTIMING[6]));
    data.roles.push(new GameRole(ROLENAME[6], ALIGNMENT[1], ACTIONTIMING[6]));
    data.roles.push(new GameRole(ROLENAME[7], ALIGNMENT[1], ACTIONTIMING[6]));
    data.roles.push(new GameRole(ROLENAME[8], ALIGNMENT[1], ACTIONTIMING[6]));
    data.roles.push(new GameRole(ROLENAME[9], ALIGNMENT[1], ACTIONTIMING[6]));
    data.roles.push(new GameRole(ROLENAME[10], ALIGNMENT[1], ACTIONTIMING[6]));
  }
}

function clearData() {
  data.players = [];
  data.roles = [];
}

//Classes
var ROLENAME;
(function(ROLENAME) {
  //Goede rollen
  ROLENAME[(ROLENAME["Beul"] = 1)] = "Beul";
  ROLENAME[(ROLENAME["Beschermengel"] = 2)] = "Beschermengel";
  ROLENAME[(ROLENAME["Burger"] = 3)] = "Burger";
  ROLENAME[(ROLENAME["Cupido"] = 4)] = "Cupido";
  ROLENAME[(ROLENAME["Heks"] = 5)] = "Heks";
  ROLENAME[(ROLENAME["Ooggetuige"] = 6)] = "Ooggetuige";
  ROLENAME[(ROLENAME["Slet"] = 7)] = "Slet";
  ROLENAME[(ROLENAME["Taai Taai"] = 8)] = "Taai Taai";
  ROLENAME[(ROLENAME["Vrouw Holle"] = 9)] = "Vrouw Holle";
  ROLENAME[(ROLENAME["Ziener"] = 10)] = "Ziener";

  //Slechte rollen
  ROLENAME[(ROLENAME["Weerwolf"] = 11)] = "Weerwolf";
  ROLENAME[(ROLENAME["Welp"] = 12)] = "Welp";
})(ROLENAME || (ROLENAME = {}));
var ALIGNMENT;
(function(ALIGNMENT) {
  ALIGNMENT[(ALIGNMENT["Goed"] = 1)] = "Goed";
  ALIGNMENT[(ALIGNMENT["Slecht"] = 2)] = "Slecht";
  ALIGNMENT[(ALIGNMENT["Neutraal"] = 3)] = "Neutraal";
})(ALIGNMENT || (ALIGNMENT = {}));
var ACTIONTIMING;
(function(ACTIONTIMING) {
  ACTIONTIMING[(ACTIONTIMING["Nacht"] = 1)] = "Nacht";
  ACTIONTIMING[(ACTIONTIMING["Dood"] = 2)] = "Dood";
  ACTIONTIMING[(ACTIONTIMING["OnevenNachten"] = 3)] = "OnevenNachten";
  ACTIONTIMING[(ACTIONTIMING["EvenNachten"] = 4)] = "EvenNachten";
  ACTIONTIMING[(ACTIONTIMING["Enkel"] = 5)] = "Enkel";
  ACTIONTIMING[(ACTIONTIMING["Geen"] = 6)] = "Geen";
})(ACTIONTIMING || (ACTIONTIMING = {}));

class Player {
  constructor(id, user, isMayor = false, isAlive = true, role, chooseable) {
    this.id = id;
    this.user = user;
    this.isMayor = isMayor;
    this.isAlive = isAlive;
    this.role = role;
    this.chooseable = chooseable;
  }
}
class GameRole {
  constructor(name, alignment, actiontiming) {
    this.name = name;
    this.alignment = alignment;
    this.actiontiming = actiontiming;
  }
}
