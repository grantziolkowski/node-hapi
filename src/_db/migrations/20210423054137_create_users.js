const { createUpdatedAtTrigger } = require('../triggers');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable('users', (table) => {
      table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary().notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.specificType('email', 'CITEXT').unique().notNullable();
      table.timestamps(false, true);
    });
    await knex.raw(createUpdatedAtTrigger('users'));
  },
  down: (knex) => knex.schema.dropTable('users'),
};
