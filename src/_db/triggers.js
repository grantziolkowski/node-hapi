module.exports = {
  createUpdatedAtTrigger: (table) => `
      CREATE TRIGGER update_${table}_updated_at
      BEFORE UPDATE ON ${table}
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `,
  dropUpdatedAtTrigger: (table) =>
    `DROP TRIGGER update_${table}_updated_at ON ${table}`,
};
