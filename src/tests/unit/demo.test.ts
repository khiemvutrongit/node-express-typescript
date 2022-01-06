import supertest from "supertest";
import app from "../../app";

const request = supertest(app);

describe('math.js Test', () => {
  test('add() should be return 7', async() => {
    const res = await request.get('/manage-product/v1/check')
    
    expect(res.status).toEqual(200);
  });
});