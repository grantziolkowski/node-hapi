/**
 * Smoke Test Post Deploy
 * @group e2e/post-deploy-health
 */

 const fetch =  require('node-fetch');

 describe('health check', () => {
   describe('/health', () => {
     it('returns status OK', async () => {
       const url = process.env.WEB_URL;
       const response = await fetch(`${url}/health`);
       const responsePayload = await response.json();

       expect(responsePayload).toEqual({ status: 'OK' });
     });
   });
 });
