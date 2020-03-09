export class GameRole{
    constructor(public name: ROLENAME, public alignment: ALIGNMENT){}
}

export enum ROLENAME{
    Civilian='CIVILIAN',
    Werewolf='WEREWOLF'
}

export enum ALIGNMENT{
    Good="GOOD",
    Evil="EVIL",
    Neutral="NEUTRAL"
}

export enum ACTION{
    Night,
    Death,
    AlternatingNightOdd,
    AlternatingNightsEven,
    Single
}