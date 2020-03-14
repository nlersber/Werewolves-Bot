const rxjs = require("rxjs");

class DataEmitter {
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor() {
    this.subject = new rxjs.Subject();
  }

  emit(type, data) {
    this.subject.next({ type, data });
  }
}

//module.exports = DataEmitter;
const emitter = new DataEmitter();
module.exports = emitter;
