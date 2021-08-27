const UserService = require('./UserService');
const Container = require('../_framework/Container');

describe('UserService', () => {
  describe('create', () => {
    it('saves a new customer', async () => {
      const mockUserRepo = {
        insert: jest.fn(),
      };
      const container = new Container();
      container.set('UserRepository', mockUserRepo);
      const userService = new UserService(container);

      await userService.create({
        firstName: 'Bugs',
        lastName: 'Bunny',
        email: 'bbunny@test.com',
      });

      expect(mockUserRepo.insert).toHaveBeenCalledWith({
        firstName: 'Bugs',
        lastName: 'Bunny',
        email: 'bbunny@test.com',
      });
    });

    it('throws an error if the user cannot be saved', async () => {
      const mockUserRepo = {
        insert: jest.fn().mockRejectedValue('duplicate key value violates unique constraint "users_email_unique"'),
      };
      const container = new Container();
      container.set('UserRepository', mockUserRepo);
      const userService = new UserService(container);

      await expect(() => userService.create({})).rejects.toThrow('User could not be created');
    });
  });

  describe('getAll', () => {
    it('returns a list of user model', async () => {
      const mockUserRepo = {
        getAll: jest.fn().mockResolvedValue([
          {
            id: '8f088589-6e86-4c5c-b632-a15512defb4c',
            firstName: 'Bugs',
            lastName: 'Bunny',
            email: 'bbunny@test.com',
            createdAt: '2021-04-30 01:14:38.78223+00',
            updatedAt: '2021-04-30 01:14:38.78223+00',
          },
          {
            id: '2f50fb7b-5a42-45be-aa48-74e2aab46002',
            firstName: 'Mickey',
            lastName: 'Mouse',
            email: 'mmouse@test.com',
            createdAt: '2021-04-30 01:14:38.78223+00',
            updatedAt: '2021-04-30 01:14:38.78223+00',
          },
        ]),
      };
      const container = new Container();
      container.set('UserRepository', mockUserRepo);
      const userService = new UserService(container);

      const result = await userService.getAll();

      expect(result).toEqual([
        {
          id: '8f088589-6e86-4c5c-b632-a15512defb4c',
          firstName: 'Bugs',
          lastName: 'Bunny',
          email: 'bbunny@test.com',
        },
        {
          id: '2f50fb7b-5a42-45be-aa48-74e2aab46002',
          firstName: 'Mickey',
          lastName: 'Mouse',
          email: 'mmouse@test.com',
        },
      ]);
    });
  });

  describe('getById', () => {
    it('returns a single user model', async () => {
      const mockUserRepo = {
        getWhere: jest.fn().mockResolvedValue([
          {
            id: '2f50fb7b-5a42-45be-aa48-74e2aab46002',
            firstName: 'Mickey',
            lastName: 'Mouse',
            email: 'mmouse@test.com',
            createdAt: '2021-04-30 01:14:38.78223+00',
            updatedAt: '2021-04-30 01:14:38.78223+00',
          },
        ]),
      };
      const container = new Container();
      container.set('UserRepository', mockUserRepo);
      const userService = new UserService(container);

      const result = await userService.getById('test-id');

      expect(result).toEqual({
        id: '2f50fb7b-5a42-45be-aa48-74e2aab46002',
        firstName: 'Mickey',
        lastName: 'Mouse',
        email: 'mmouse@test.com',
      });
    });
  });
});
