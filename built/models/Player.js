export class Player {
    constructor(id, user, isMayor = false, isAlive = true, role, chooseable) {
        this.id = id;
        this.user = user;
        this.isMayor = isMayor;
        this.isAlive = isAlive;
        this.role = role;
        this.chooseable = chooseable;
    }
}
