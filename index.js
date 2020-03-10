const Discord = require("discord.js"); //Discord api
const settings = require("./settings.json"); //Contains token and prefix
const path = require("path");
const commando = require("discord.js-commando"); //Discord command API
const data = require("./data.json"); //Contains data. Players, roles, etc
const Models = require("./built/models/Models");
const Player = Models.Player;
const Role = Models.Role;
const ROLENAME = Models.ROLENAME;
const ACTIONTIMING = Models.ACTIONTIMING;
const ALIGNMENT = Models.ALIGNMENT;
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
    data.roles.push(
      new Role(
        ACTIONTIMING[ACTIONTIMING["Night"]],
        ALIGNMENT[ALIGNMENT["Good"]],
        ACTIONTIMING[ACTIONTIMING["None"]]
      )
    );
  }
}

function clearData() {
  data.players = [];
  data.roles = [];
}
