import { User } from "discord.js";
import { GameRole } from "./GameRole";

export class Player {
  constructor(public id: number, public user: User, public isMayor: boolean=false, public isAlive: boolean=true, public role: GameRole, public chooseable: boolean) {}
}

