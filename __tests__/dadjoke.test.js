const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

// const { getDadJokes } = require('../data/dad-jokes-data');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
  // Test go Here
  it('Should render API data', async () => {
    const res = await request(app).get('/dadjokes');
    console.log('Line 16', res.body);
    // console.log(res);
    expect(res.body).toEqual({ id: expect.any(String), joke: expect.any(String) });
  });




  afterAll(() => {
    pool.end();
  });
});
