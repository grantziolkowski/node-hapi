const Pino = require('pino');

module.exports = {
  name: 'logger',
  register: async (server) => {
    await server.register({
      plugin: require('hapi-pino'),
      options: {
        enabled: process.env.NODE_ENV !== 'test',
        redact: ['req.headers.authorization'],
        timestamp: Pino.stdTimeFunctions.isoTime,
        prettyPrint: process.env.NODE_ENV !== 'production',
      },
    });
  },
};
