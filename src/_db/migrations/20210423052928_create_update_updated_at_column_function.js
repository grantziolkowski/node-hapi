module.exports = {
  up: (knex) =>
    knex.raw(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN
          NEW.updated_at = now();
          RETURN NEW;
        ELSE
          RETURN OLD;
        END IF;
      END;
      $$ language 'plpgsql';
    `),

  down: (knex) => knex.raw('DROP FUNCTION IF EXISTS update_updated_at_column'),
};
