const Boom = require('@hapi/boom');
const UserModel = require('./UserModel');

module.exports = class UserService {
  constructor(container) {
    this.userRepository = container.get('UserRepository');
  }

  async create(user) {
    try {
      await this.userRepository.insert(user);
    } catch (e) {
      throw Boom.badData('User could not be created');
    }
  }

  async getAll() {
    const users = await this.userRepository.getAll();
    return users.map((user) => new UserModel(user));
  }

  async getById(id) {
    const users = await this.userRepository.getWhere({ id });
    return new UserModel(users[0]);
  }
};
