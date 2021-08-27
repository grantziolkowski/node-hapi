module.exports = {
  seed: async (knex) => {
    await knex.raw('TRUNCATE users CASCADE');

    return knex('users').insert([
      {
        id: '8f088589-6e86-4c5c-b632-a15512defb4c',
        first_name: 'Bugs',
        last_name: 'Bunny',
        email: 'bbunny@test.com',
      },
      {
        id: '2f50fb7b-5a42-45be-aa48-74e2aab46002',
        first_name: 'Mickey',
        last_name: 'Mouse',
        email: 'mmouse@test.com',
      },
    ]);
  },
};
