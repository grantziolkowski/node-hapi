/**
 * healthRoutes
 * @group integration/routes
 */

 describe('healthRoutes', () => {
  describe('/health', () => {
    it('returns status OK', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/health',
      });
      const responsePayload = JSON.parse(response.payload);

      expect(responsePayload).toEqual({ status: 'OK' });
    });
  });
});
