import supertest from "supertest";
import setupDB from "../utils/setupDB";
import app from "../../app";
import mockData from "../../mocks/products.mock.json";
import { generateToken } from "../../services/token.service";
import { payload, privateKey } from "../../mocks/jwt";
setupDB();
const server = supertest(app);

describe("MP01 GET /manage-product/v1/products?query,sort,limit,start", () => {
  test("should be return success", () => {});
  test("query by field & limit & start should be return success", () => {});
});

describe("MP02 GET /manage-product/v1/products?query,sort,limit,start", () => {
  test("should be return success", () => {});
  test("missing header authorization should be return false", () => {});
  test("query by field & limit & start should be return success", () => {});
});

describe("MP03 GET /manage-product/v1/products/{id}", () => {
  test("get one product public should return success", () => {});
  test("missing id should be return false", () => {});
});

describe("MP04 GET /manage-product/v1/products/{id}", () => {
  test("get one product private should return success", () => {});
  test("missing id private should be return false", () => {});
  test("missing header authorization should be return false", () => {});
});

describe("MP05 POST /manage-product/v1/products", () => {
  // missing parameter should return false
  test("missing parameter body should return false", async () => {
    const tokenMock = generateToken(payload, privateKey);
    const response = await server
      .post("/manage-product/v1/products")
      .set('Authorization', `Bearer ${tokenMock}`)
      .set("Accept", "application/json")
      .send({})
      .expect(400);
    expect(response.status).toEqual(400);
  });

  // should return success
  test("should return success", async () => {
    const tokenMock = generateToken(payload, privateKey);
    const response = await server
      .post("/manage-product/v1/products")
      .set('Authorization', `Bearer ${tokenMock}`)
      .set("Accept", "application/json")
      .send(mockData.createProductMock)
      .expect(201);
    expect(response.status).toEqual(201);
  });
});
