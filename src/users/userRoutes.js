const { createUserPayloadSchema, getUserParamsSchema } = require('./userRouteSchemas');

module.exports = {
  name: 'userRoutes',
  register: (server, { container }) => {
    server.route({
      method: 'POST',
      path: '/users',
      options: {
        auth: false,
        tags: ['api'],
        validate: {
          payload: createUserPayloadSchema,
        },
      },
      handler: async ({ payload }, h) => {
        await container.get('UserService').create(payload);
        return h.response().code(201);
      },
    });

    server.route({
      method: 'GET',
      path: '/users',
      options: {
        auth: false,
        tags: ['api'],
      },
      handler: async () => {
        return container.get('UserService').getAll();
      },
    });

    server.route({
      method: 'GET',
      path: '/users/{id}',
      options: {
        auth: false,
        tags: ['api'],
        validate: {
          params: getUserParamsSchema,
        },
      },
      handler: async (request) => {
        const { id } = request.params;
        return container.get('UserService').getById(id);
      },
    });
  },
};
