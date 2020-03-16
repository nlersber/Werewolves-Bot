const fs = require("fs");
const data = require("../data.json");
const ManagerBase = require("./ManagerBase");

class ChannelManager extends ManagerBase {
  constructor() {
    super();
  }

  check() {}

  saveChannel(channel) {}
}

const manager = new ChannelManager();
module.exports = manager;
