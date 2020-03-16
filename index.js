const Discord = require("discord.js"); //Discord api
const settings = require("./settings.json"); //Contains token and prefix
const path = require("path");
const commando = require("discord.js-commando"); //Discord command API
const data = require("./data.json"); //Contains data. Players, roles, etc
const fs = require("fs"); //File-system, used to write to json
const rxjs = require("rxjs");
const emitter = require("./models/DataEmitter");
const Player = require("./models/Player");
const GameRole = require("./models/GameRole");
const userManager = require("./Managers/UserManager");

/* #region declaration timers  */
let timerDeadlineInschrijving;
let timerDeadlineRoleSet;
/* #endregion */

const client = new commando.CommandoClient({
  owner: "686344322089615387", // Your ID here.//686344322089615387
  commandPrefix: "$", // The prefix of your bot.
  unknownCommandResponse: false // Set this to true if you want to send a message when a user uses the prefix not followed by a command
});

client.on("ready", () => {
  clearData();
  initData();
  //TODO: check for set timers in data, re-initialize them
});

//reaction to custom events via Subject
emitter.subject.subscribe(s => {
  let type = s.type.toLowerCase();
  let data = s.data;
  if (!!!type) return; //Return if no type is given

  switch (type) {
    case "inschrijving":
      setDeadlineInschrijving(data.datestring, data.author);
      break;
  }

  saveData();
});

client.registry.registerDefaults();

client.registry.registerGroup("admin", "Admin Commands");
client.registry.registerCommandsIn(path.join(__dirname, "/commands"));

client.login(settings.token);

/* #region Functions */

/* #region  Functions init */
function initData() {
  if (!!data && !!!data.roles.length) {
    data.roles.concat([
      new GameRole(ROLENAME[1], ALIGNMENT[1], ACTIONTIMING[5]),
      new GameRole(ROLENAME[2], ALIGNMENT[1], ACTIONTIMING[2]),
      new GameRole(ROLENAME[3], ALIGNMENT[1], ACTIONTIMING[6]),
      new GameRole(ROLENAME[4], ALIGNMENT[1], ACTIONTIMING[6]),
      new GameRole(ROLENAME[5], ALIGNMENT[1], ACTIONTIMING[6]),
      new GameRole(ROLENAME[6], ALIGNMENT[1], ACTIONTIMING[6]),
      new GameRole(ROLENAME[7], ALIGNMENT[1], ACTIONTIMING[6]),
      new GameRole(ROLENAME[8], ALIGNMENT[1], ACTIONTIMING[6]),
      new GameRole(ROLENAME[9], ALIGNMENT[1], ACTIONTIMING[6]),
      new GameRole(ROLENAME[10], ALIGNMENT[1], ACTIONTIMING[6])
    ]);

    fs.writeFileSync("./data.json", JSON.stringify(data));
    console.log("written");
  }
}

function clearData() {
  data.players = [];
  data.roles = [];
  data.inschrijf.inschrijfmessage = 0;
  data.inschrijf.inschrijfchannel = 0;
}
/* #endregion */

/* #region  Functions set deadlines */

/**
 * Sets the deadline for inschrijvingen. Checks the arguments, adds and saves the timer, goes over all the reactions to add the Players
 * @param {string} time Date string used to make the timer.
 * @param {User} author User that sent the commando. Used to send an error message if a problem is encountered.
 */
function setDeadlineInschrijving(time, author) {
  //make date, check if valid string
  let datetime = new Date(time);
  //datetime.setSeconds(datetime.getSeconds() + 2); //Remove for prod

  //If date is invalid
  if (!!!datetime) {
    author.send(
      `De deadline '${time}' is niet correct geformatteerd. Bekijk het vorige bericht voor de juiste formatting.`
    );
    return;
  }

  //store datestring if valid
  data.deadlines.inschrijving = time;

  //make timer
  timerDeadlineInschrijving = rxjs.timer(datetime);

  //add subscribe to timer
  timerDeadlineInschrijving.subscribe(s => {
    //get channel
    let inschrijfchannel = client.channels.find(
      s => s.id === data.inschrijf.inschrijfchannel
    );

    //fetch message, then go over the reactions
    inschrijfchannel.fetchMessage(data.inschrijf.inschrijfmessage).then(s => {
      //counter used to add an index to each player
      let counter = 1;
      //go over each reaction
      s.reactions.array().forEach(t => {
        //👍//👎

        //Used to determine which emoji was used. If neither was used, input is ignored.
        let isAlive;
        if (t.emoji.name === "👍") isAlive = true;
        //if participating
        else if (t.emoji.name === "👎") isAlive = false;
        //if observing
        else return; //if pretending

        //filter out the bot itself
        t.users = t.users.filter(s => s !== client.user);

        //for each reaction, go over the users that reacted
        t.users.array().forEach(u => {
          //add user to the JSON
          userManager.addActiveUser(
            new Player(counter, u.id, false, isAlive, null, null)
          );
          //increment ID counter
          counter++;
        }); //end forEach users
      }); //end forEach reactions
    }); //end fetchmessage .then
    saveData();
  }); //end subscribe

  //Save data. Added players get saved automatically.
}

/* #endregion */

function saveData() {
  fs.writeFileSync("./data.json", JSON.stringify(data));
}

/* #endregion Functions */

//Enums
/* #region Enums */
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
/* #endregion */
