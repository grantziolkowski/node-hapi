require('./environment');
const { configureContainer } = require('./_framework/configureContainer');
const { configureServer } = require('./_framework/configureServer');

const start = async () => {
  const container = configureContainer();
  const server = await configureServer(container);
  await server.start();
};

start();
