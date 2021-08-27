require('../environment');

const camelCase = require('lodash/camelCase');
const snakeCase = require('lodash/snakeCase');

const camelCaseObj = (obj) =>
  Object.keys(obj).reduce(
    (camelCaseResp, key) => ({
      ...camelCaseResp,
      [camelCase(key)]: obj[key],
    }),
    {},
  );

module.exports = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' && { rejectUnauthorized: false },
  },
  postProcessResponse: (result) => {
    if (Array.isArray(result)) {
      return result.map((row) => camelCaseObj(row));
    }
    return camelCaseObj(result);
  },
  wrapIdentifier: (value, origImpl) => origImpl(snakeCase(value)),
};
