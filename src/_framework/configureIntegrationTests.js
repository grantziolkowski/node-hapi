const knexCleaner = require('knex-cleaner');
const { configureContainer } = require('./configureContainer');
const { configureServer } = require('./configureServer');

beforeAll(async () => {
  global.container = configureContainer();
  global.server = await configureServer(global.container);
});

afterEach(async () => {
  await knexCleaner.clean(container.get('db'), {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
});

afterAll(async () => {
  const db = global.container.get('db');
  await db.destroy();
});
