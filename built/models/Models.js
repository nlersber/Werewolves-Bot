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
var ROLENAME;
(function (ROLENAME) {
    ROLENAME["Civilian"] = "CIVILIAN";
    ROLENAME["Werewolf"] = "WEREWOLF";
})(ROLENAME || (ROLENAME = {}));
var ALIGNMENT;
(function (ALIGNMENT) {
    ALIGNMENT["Good"] = "GOOD";
    ALIGNMENT["Evil"] = "EVIL";
    ALIGNMENT["Neutral"] = "NEUTRAL";
})(ALIGNMENT || (ALIGNMENT = {}));
var ACTIONTIMING;
(function (ACTIONTIMING) {
    ACTIONTIMING[ACTIONTIMING["Night"] = 0] = "Night";
    ACTIONTIMING[ACTIONTIMING["Death"] = 1] = "Death";
    ACTIONTIMING[ACTIONTIMING["AlternatingNightOdd"] = 2] = "AlternatingNightOdd";
    ACTIONTIMING[ACTIONTIMING["AlternatingNightsEven"] = 3] = "AlternatingNightsEven";
    ACTIONTIMING[ACTIONTIMING["Single"] = 4] = "Single";
    ACTIONTIMING[ACTIONTIMING["None"] = 5] = "None";
})(ACTIONTIMING || (ACTIONTIMING = {}));
