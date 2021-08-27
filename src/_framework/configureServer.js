const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../../package');
const Server = require('./Server');
const healthRoutes = require('../health/healthRoutes');
const logger = require('../logger/logger');
const userRoutes = require('../users/userRoutes');

const swaggerOptions = {
  info: {
    title: 'Node Hapi API Documentation',
    description: 'Node Hapi API Description',
    version: Pack.version,
  },
};

module.exports = {
  configureServer: async (container) => {
    const server = new Server({
      host: process.env.SERVER_HOST,
      port: process.env.PORT || process.env.SERVER_PORT,
    });
    await server.register([
      Inert,
      Vision,
      { plugin: HapiSwagger, options: swaggerOptions },
      { plugin: logger },
      { plugin: healthRoutes, options: { container } },
      { plugin: userRoutes, options: { container } },
    ]);

    return server;
  },
};
