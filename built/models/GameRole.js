export class GameRole {
    constructor(name, alignment) {
        this.name = name;
        this.alignment = alignment;
    }
}
export var ROLENAME;
(function (ROLENAME) {
    ROLENAME["Civilian"] = "CIVILIAN";
    ROLENAME["Werewolf"] = "WEREWOLF";
})(ROLENAME || (ROLENAME = {}));
export var ALIGNMENT;
(function (ALIGNMENT) {
    ALIGNMENT["Good"] = "GOOD";
    ALIGNMENT["Evil"] = "EVIL";
    ALIGNMENT["Neutral"] = "NEUTRAL";
})(ALIGNMENT || (ALIGNMENT = {}));
export var ACTION;
(function (ACTION) {
    ACTION[ACTION["Night"] = 0] = "Night";
    ACTION[ACTION["Death"] = 1] = "Death";
    ACTION[ACTION["AlternatingNightOdd"] = 2] = "AlternatingNightOdd";
    ACTION[ACTION["AlternatingNightsEven"] = 3] = "AlternatingNightsEven";
    ACTION[ACTION["Single"] = 4] = "Single";
})(ACTION || (ACTION = {}));
