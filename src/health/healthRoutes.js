module.exports = {
  name: 'healthRoutes',
  register: (server, { container }) => {
    server.route({
      method: 'GET',
      path: '/health',
      options: {
        auth: false,
        tags: ['api'],
      },
      handler: async () => {
        await container.get('db').raw('select 1');

        return { status: 'OK' };
      },
    });
  },
};
