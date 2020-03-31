const fs = require("fs");

module.exports = function SaveData(data) {
  fs.writeFileSync("./data.json", JSON.stringify(data));
};
