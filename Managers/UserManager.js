const fs = require("fs");
const data = require("../data.json");
const ManagerBase = require("./ManagerBase");

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
    let string = "";
    string = string + "";
  }
}

const manager = new UserManager();
module.exports = manager;
