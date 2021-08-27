module.exports = class Container {
  constructor() {
    this.services = {};
  }

  get(name) {
    return this.services[name];
  }

  set(name, service) {
    this.services[name] = service;
  }
};
