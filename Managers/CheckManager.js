class CheckManager {
  constructor() {
    this.managers = [];
  }
  registerManager(manager) {
    this.managers.push(manager);
  }

  check() {
    let string = "";
    this.managers.forEach(s => {
      string = string + s.check() + "\n";
    });
    return string;
  }
}

const manager = new CheckManager();
module.exports = manager;
