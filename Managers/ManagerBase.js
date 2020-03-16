const CheckManager = require("./CheckManager");

class ManagerBase {
  /**
   * Base constructor for all Manager classes.
   * @param {ManagerBase} manager Manager subclass. Stores instance in the CheckManager. Used to call the check command
   */
  constructor() {
    CheckManager.registerManager(this);
  }

  check() {}

  ///Gets set by any manager
  setGuild(guild) {
    if (!!!this.guild) this.guild = guild;
  }
}

module.exports = ManagerBase;
