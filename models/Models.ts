
class Player {
  constructor(public id: number, public user, public isMayor: boolean=false, public isAlive: boolean=true, public role: GameRole, public chooseable: boolean) {}
}

 class GameRole{
  constructor(public name: ROLENAME, public alignment: ALIGNMENT, public actiontiming: ACTIONTIMING){}
}

 enum ROLENAME{
  Civilian='CIVILIAN',
  Werewolf='WEREWOLF'
  
}

 enum ALIGNMENT{
  Good="GOOD",
  Evil="EVIL",
  Neutral="NEUTRAL"
}

 enum ACTIONTIMING{
  Night,
  Death,
  AlternatingNightOdd,
  AlternatingNightsEven,
  Single,
  None
}

