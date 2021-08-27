/**
 * BaseRepository
 * @group integration/repositories
 */

const BaseRepository = require('./BaseRepository');

describe('BaseRepository', () => {
  let repo;
  let trx;

  beforeEach(async () => {
    repo = new BaseRepository(container.get('db'), 'knex_migrations');
    const tp = container.get('db').transactionProvider();
    trx = await tp();
  });

  afterEach(async () => {
    await trx.rollback();
  });

  describe('insert', () => {
    it('inserts a new row', async () => {
      await repo.insert(
        {
          id: 3000,
          name: 'test',
          batch: 1,
        },
        trx,
      );
      const result = await repo.getWhere({ name: 'test' }, trx);
      expect(result).toHaveLength(1);
    });

    it('returns the id', async () => {
      const result = await repo.insert(
        {
          id: 3000,
          name: 'test',
          batch: 1,
        },
        trx,
      );
      expect(result).toEqual([{ id: 3000 }]);
    });
  });

  describe('patch', () => {
    it('patches an existing row', async () => {
      await repo.insert(
        {
          id: 3000,
          name: 'test',
          batch: 1,
        },
        trx,
      );
      await repo.patch(
        {
          id: 3000,
          name: 'new test',
        },
        trx,
      );
      const result = await repo.getWhere({ name: 'new test' }, trx);
      expect(result).toHaveLength(1);
    });
  });

  describe('getWhere', () => {
    it('gets an existing row by id', async () => {
      await repo.insert(
        {
          id: 3000,
          name: 'test',
          batch: 1,
        },
        trx,
      );
      const result = await repo.getWhere({ name: 'test' }, trx);
      expect(result).toHaveLength(1);
    });
  });
});
