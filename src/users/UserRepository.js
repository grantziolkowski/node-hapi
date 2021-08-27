const BaseRepository = require('../_db/BaseRepository');

module.exports = class UserRepository extends BaseRepository {
  constructor(db) {
    super(db, 'users');
  }
};
