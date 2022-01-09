import supertest from "supertest";
import setupDB from "../utils/setupDB";
import app from "../../app";
import mockData from "../../mocks/products.mock.json";
import { payload, privateKey } from "../../mocks/jwt";
import { createProductService, generateToken } from "../../services";
setupDB();
const server = supertest(app);

describe("MP01 GET /manage-product/v1/products?query,sort,limit,start", () => {
  test("should be return success", async() => {
    const response = await server
      .get("/manage-product/v1/products");
    
      expect(response.status).toEqual(200);
  });
  test("query by field & limit & start should be return success", async() => {
    const response = await server
    .get(`/manage-product/v1/products?limit=10&start=0&sort=-createdAt&query=name%like%`);
    
    expect(response.status).toEqual(200);
  });
});

describe("MP02 GET /manage-product/v1/private/products?query,sort,limit,start", () => {
  const tokenMock = generateToken(payload, privateKey);
  test("should be return success", async () => {
    const response = await server
    .get("/manage-product/v1/private/products")
    .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toEqual(200);
  });

  test("missing header authorization should be return false", async() => {
    const response = await server
    .get(`/manage-product/v1/private/products?limit=10&start=0&sort=-createdAt&query=name%like%test`);

    expect(response.status).toEqual(401);
  });

  test("query by field & limit & start should be return success", async () => {
    const response = await server
    .get(`/manage-product/v1/private/products?limit=10&start=0&sort=-createdAt&query=name%like%test`)
    .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toEqual(200);
  });
});

describe("MP03 GET /manage-product/v1/products/{id}", () => {

  test("get one product public should return success", async () => {
    const productMock = await createProductService(mockData.createProductMock);
    const response = await server
    .get(`/manage-product/v1/products/${productMock.id}`);

    expect(response.status).toEqual(200);
  });

  test("invalid id should be return false", async() => {
    const response = await server
    .get(`/manage-product/v1/products/${mockData.fakeId}`);

    expect(response.status).toEqual(400);
  });

});

describe("MP04 GET /manage-product/v1/private/products/{id}", () => {
  const tokenMock = generateToken(payload, privateKey);

  test("get one product private should return success", async () => {
    const productMock = await createProductService(mockData.createProductMock);
    const response = await server
    .get(`/manage-product/v1/private/products/${productMock.id}`)
    .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toEqual(200);
  });

  test("invalid id private should be return false", async () => {
    const response = await server
    .get(`/manage-product/v1/private/products/${mockData.fakeId}`)
    .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toEqual(400);
  });
});

describe("MP05 POST /manage-product/v1/products", () => {
  const tokenMock = generateToken(payload, privateKey);
  // missing parameter should return false
  test("missing parameter body should return false", async () => {
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
    const response = await server
      .post("/manage-product/v1/products")
      .set('Authorization', `Bearer ${tokenMock}`)
      .set("Accept", "application/json")
      .send(mockData.createProductMock)
      .expect(201);
    expect(response.status).toEqual(201);
  });
});

describe("MP06 PUT /manage-product/v1/products/{id}", () => {
  const tokenMock = generateToken(payload, privateKey);
  
  test("update product should be success", async() => {
    const productMock = await createProductService(mockData.createProductMock);
    
    const response = await server
      .put(`/manage-product/v1/products/${productMock.id}`)
      .set('Authorization', `Bearer ${tokenMock}`)
      .set("Accept", "application/json")
      .send(mockData.updateProductMock);
    expect(response.status).toEqual(200);
  });

  test("body product is empty should be success", async() => {
    const productMock = await createProductService(mockData.createProductMock);
    
    const response = await server
      .put(`/manage-product/v1/products/${productMock.id}`)
      .set('Authorization', `Bearer ${tokenMock}`)
      .set("Accept", "application/json")

    expect(response.status).toEqual(400);
  });

  test("invalid id parameter should be return false", async() => {
    const response = await server
    .put(`/manage-product/v1/products/${mockData.fakeId}`)
    .set('Authorization', `Bearer ${tokenMock}`)
    .set("Accept", "application/json")
    .send({});

    expect(response.status).toEqual(400);
  });

});

describe("MP07 DELETE /manage-product/v1/products/{id}", () => {
  const tokenMock = generateToken(payload, privateKey);

  test("delete should return success", async() => {
    const productMock = await createProductService(mockData.createProductMock);
    const response = await server
      .delete(`/manage-product/v1/products/${productMock.id}`)
      .set('Authorization', `Bearer ${tokenMock}`)
      .set("Accept", "application/json")
      .send({});
    expect(response.status).toEqual(204);
  });

  test("missing id should return false", async() => {
    const response = await server
      .delete(`/manage-product/v1/products/`)
      .set('Authorization', `Bearer ${tokenMock}`)
      .set("Accept", "application/json")
      .send({});
    expect(response.status).toEqual(400);
  });

  test("invalid id should return false", async() => {
    const response = await server
      .delete(`/manage-product/v1/products/${mockData.fakeId}`)
      .set('Authorization', `Bearer ${tokenMock}`)
      .set("Accept", "application/json")
      .send({});
    expect(response.status).toEqual(400);
  });
});