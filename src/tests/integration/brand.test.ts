import supertest from "supertest";
import setupDB from "../utils/setupDB";
import app from "../../app";
import mockData from "../../mocks/products.mock.json";
import { payload, privateKey } from "../../mocks/jwt";
import { createBrandService, generateToken } from "../../services";
setupDB();
const server = supertest(app);

describe("MP08 /manage-product/v1/brands?query,sort,limit,page", () => {
  test("should be return success", async () => {
    await createBrandService(mockData.createBrandMock);
    const response = await server
      .get("/manage-product/v1/brands?limit=10&start=0&sort=-createdAt");

    expect(response.status).toEqual(200);
  });

  test("query should by field name should return success", async () => {
    const response = await server
      .get("/manage-product/v1/brands?query=name%like%test");
      
    expect(response.status).toEqual(200);
  });
});

describe("MP09 /manage-product/v1/brands/private?query,sort,limit,page", () => {
  const tokenMock = generateToken(payload, privateKey);

  test("should be return success", async () => {
    const response = await server
      .get('/manage-product/v1/brands/private?query=name%eq%test&limit=1$start=0&sort=-createdAt')
      .set('Authorization', `Bearer ${tokenMock}`);
    
    expect(response.status).toEqual(200);
  });

  test("missing header authorization should be return false", async () => {
    const response = await server
    .get('/manage-product/v1/brands/private?query=name%eq%test&limit=1$start=0,sort=-createdAt')
  
    expect(response.status).toEqual(401);
  });
});

describe("MP10 /manage-product/v1/brands/{id}", () => {
  test("get product public should return success", async () => {
    const brandMock = await createBrandService(mockData.createBrandMock);
    const response = await server
    .get(`/manage-product/v1/brands/${brandMock.id}`);

    expect(response.status).toEqual(200);
  });

  test("invalid id should be return false", async () => {
    const response = await server
    .get(`/manage-product/v1/brands/${mockData.fakeId}`);

    expect(response.status).toEqual(400);
  });
});

describe("MP11 /manage-product/v1/brands/private/{id}", () => {
  const tokenMock = generateToken(payload, privateKey);

  test("get product public should return success", async () => {
    const brandMock = await createBrandService(mockData.createBrandMock);
    const response = await server
      .get(`/manage-product/v1/brands/private/${brandMock.id}`)
      .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toEqual(200);
  });

  test("invalid id should be return false", async () => {
    const response = await server
    .get(`/manage-product/v1/brands/private/${mockData.fakeId}`)
    .set('Authorization', `Bearer ${tokenMock}`);

  expect(response.status).toEqual(400);
  });
});

describe("MP12 /manage-product/v1/brands", () => {
  const tokenMock = generateToken(payload, privateKey);

  test("missing parameter body should return false", async () => {
    const response = await server
      .post(`/manage-product/v1/brands`)
      .set("Accept", "application/json")
      .set('Authorization', `Bearer ${tokenMock}`)
      .send({});
      
      expect(response.status).toEqual(400);
  });

  test("should return success", async () => {
    const response = await server
      .post(`/manage-product/v1/brands`)
      .set("Accept", "application/json")
      .set('Authorization', `Bearer ${tokenMock}`)
      .send(mockData.createBrandMock);
    
    expect(response.status).toEqual(201);
  });
});

describe("MP13 /manage-product/v1/brands/{id}", () => {
  const tokenMock = generateToken(payload, privateKey);

  test("update brand should be success", async () => {
    const brandMock = await createBrandService(mockData.createBrandMock);
    const response = await server
      .put(`/manage-product/v1/brands/${brandMock.id}`)
      .set('Authorization', `Bearer ${tokenMock}`)
      .set("Accept", "application/json")
      .send(mockData.updateBrandMock);
    
    expect(response.status).toEqual(200);
  });

  test("body product is empty should be false", async () => {
    const brandMock = await createBrandService(mockData.createBrandMock);
    const response = await server
      .put(`/manage-product/v1/brands/${brandMock.id}`)
      .set('Authorization', `Bearer ${tokenMock}`)
      .set("Accept", "application/json")
      .send({});
    
    expect(response.status).toEqual(400);
  });

  test("invalid id should return false", async () => {
    const response = await server
      .put(`/manage-product/v1/brands/${mockData.fakeId}`)
      .set('Authorization', `Bearer ${tokenMock}`)
      .set("Accept", "application/json")
      .send({});
    
    expect(response.status).toEqual(400);
  });
});

describe("MP14 /manage-product/v1/brands/{id}", () => {
  const tokenMock = generateToken(payload, privateKey);

  test("delete brand should be success", async () => {
    const brandMock = await createBrandService(mockData.createBrandMock);
    const response = await server
      .delete(`/manage-product/v1/brands/${brandMock.id}`)
      .set('Authorization', `Bearer ${tokenMock}`)

    expect(response.status).toEqual(204);
  });
  test("missing header authorization should be return false", async () => {
    const brandMock = await createBrandService(mockData.createBrandMock);
    const response = await server
      .delete(`/manage-product/v1/brands/${brandMock.id}`);

    expect(response.status).toEqual(401);
  });
  test("invalid id should return false", async () => {
    const response = await server
      .delete(`/manage-product/v1/brands/${mockData.fakeId}`)
      .set('Authorization', `Bearer ${tokenMock}`)

    expect(response.status).toEqual(400);
  });
});
