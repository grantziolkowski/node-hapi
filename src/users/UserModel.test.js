const UserModel = require('./UserModel');

describe('UserModel', () => {
  it('instantiates objects with set attributes', () => {
    const mockUser = {
      id: 'a3012fd7-8ffb-4806-a88b-7e931cdb02e9',
      firstName: 'Bobby',
      lastName: 'Strider',
      email: 'bobby.strider@test.com',
      passwordHash: 'password-hash',
      phone: '1234567890',
    };

    const result = new UserModel(mockUser);

    expect(result).toEqual({
      id: 'a3012fd7-8ffb-4806-a88b-7e931cdb02e9',
      firstName: 'Bobby',
      lastName: 'Strider',
      email: 'bobby.strider@test.com',
    });
  });
});
