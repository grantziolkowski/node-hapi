module.exports = class BaseRepository {
  constructor(db, table) {
    this._db = db;
    this._table = table;
  }

  async insert(entity, trx = this._db) {
    return trx(this._table).insert(entity, ['id']);
  }

  async patch(entity, trx = this._db) {
    return trx(this._table).where({ id: entity.id }).update(entity);
  }

  async getWhere(criteria, trx = this._db) {
    return trx(this._table).where(criteria);
  }

  async getAll(trx = this._db) {
    return trx(this._table);
  }
};
