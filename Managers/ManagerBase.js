const CheckManager = require("./CheckManager");
const fs = require("fs");
const data = require("../data.json");

class ManagerBase {
  /**
   * Base constructor for all Manager classes.
   * @param {ManagerBase} manager Manager subclass. Stores instance in the CheckManager. Used to call the check command
   */
  constructor() {
    CheckManager.registerManager(this);
  }

  check() {}
}

module.exports = ManagerBase;
