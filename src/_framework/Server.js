const Hapi = require('@hapi/hapi');

module.exports = class Server {
  constructor({ host, port }) {
    this.server = Hapi.server({
      port,
      host,
    });
  }

  async register(routes) {
    await this.server.register(routes);
  }

  async inject(options) {
    return this.server.inject(options);
  }

  async stop() {
    return this.server.stop();
  }

  async start() {
    await this.server.start();
    process.on('unhandledRejection', (err) => {
      console.log(err);
      process.exit(1);
    });
  }
};
