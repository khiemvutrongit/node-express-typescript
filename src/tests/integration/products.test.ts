import supertest from "supertest";
import setupDB from "../utils/setupDB";
import app from "../../app";
import mockData from "../../mocks/products.mock.json";
setupDB();
const server = supertest(app);

describe("05 POST /manage-product/v1/products", () => {
  // missing parameter should return false
  test("missing parameter body should return false", async () => {
    const response = await server
      .post("/manage-product/v1/products")
      .set("Accept", "application/json")
      .send({})
      .expect(400);
    expect(response.status).toEqual(400);
  });

  // should return success
  test("should return success", async () => {
    const response = await server
      .post("/manage-product/v1/products")
      .set("Accept", "application/json")
      .send(mockData.createProductMock)
      .expect(201);
    expect(response.status).toEqual(201);
  });
});
