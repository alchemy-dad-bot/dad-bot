const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
  // Test go Here
  it('Should render API data', async () => {
    const res = await request(app).get('/dadjokes');
    expect(res.body).toEqual({ id: expect.any(String), joke: expect.any(String) });
  });




  afterAll(() => {
    pool.end();
  });
});
