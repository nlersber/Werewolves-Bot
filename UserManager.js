const fs = require("fs");
const data = require("./data.json");

class UserManager {
  addActiveUser(user) {
    data.players.push(user);

    fs.writeFileSync("./data.json", JSON.stringify(data));
    console.log(data);
  }
}

const userManager = new UserManager();
module.exports = userManager;
