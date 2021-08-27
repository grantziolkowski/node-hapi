/**
 * userRoutes
 * @group integration/routes
 */

describe('userRoutes', () => {
  describe('POST /users', () => {
    let response;

    beforeAll(async () => {
      response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          firstName: 'Bugs',
          lastName: 'Bunny',
          email: 'bbunny@test.com',
        },
      });
    });

    it('creates a new user', async () => {
      const users = await container.get('UserRepository').getWhere({
        firstName: 'Bugs',
        lastName: 'Bunny',
        email: 'bbunny@test.com',
      });
      expect(users).toHaveLength(1);
    });

    it('returns a 201 status code', async () => {
      expect(response.statusCode).toBe(201);
    });
  });

  describe('GET /users', () => {
    it('returns all the users', async () => {
      await container.get('UserRepository').insert({
        id: '8f088589-6e86-4c5c-b632-a15512defb4c',
        firstName: 'Bugs',
        lastName: 'Bunny',
        email: 'bbunny@test.com',
      });
      await container.get('UserRepository').insert({
        id: '2f50fb7b-5a42-45be-aa48-74e2aab46002',
        firstName: 'Mickey',
        lastName: 'Mouse',
        email: 'mmouse@test.com',
      });

      const response = await server.inject({
        method: 'GET',
        url: '/users',
      });
      const responsePayload = JSON.parse(response.payload);

      expect(responsePayload).toEqual([
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

  describe('GET /users/{id}', () => {
    it('returns the user with that id', async () => {
      const id = '8f088589-6e86-4c5c-b632-a15512defb4c';
      await container.get('UserRepository').insert({
        id,
        firstName: 'Bugs',
        lastName: 'Bunny',
        email: 'bbunny@test.com',
      });
      await container.get('UserRepository').insert({
        id: '2f50fb7b-5a42-45be-aa48-74e2aab46002',
        firstName: 'Mickey',
        lastName: 'Mouse',
        email: 'mmouse@test.com',
      });

      const response = await server.inject({
        method: 'GET',
        url: `/users/${id}`,
      });
      const responsePayload = JSON.parse(response.payload);

      expect(responsePayload).toEqual({
        id,
        firstName: 'Bugs',
        lastName: 'Bunny',
        email: 'bbunny@test.com',
      });
    });
  });
});
