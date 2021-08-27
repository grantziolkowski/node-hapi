const knex = require('knex');
const Container = require('./Container');
const UserService = require('../users/UserService');
const UserRepository = require('../users/UserRepository');
const knexFile = require('../_db/knexfile');

const registerRepositories = (container) => {
  container.set('UserRepository', new UserRepository(container.get('db')));
};

const registerServices = (container) => {
  container.set('UserService', new UserService(container));
};

module.exports = {
  configureContainer: () => {
    const container = new Container();

    container.set('db', knex(knexFile));

    registerRepositories(container);
    registerServices(container);

    return container;
  },
};
