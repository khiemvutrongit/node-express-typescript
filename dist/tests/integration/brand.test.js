"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const setupDB_1 = __importDefault(require("../utils/setupDB"));
const app_1 = __importDefault(require("../../app"));
const products_mock_json_1 = __importDefault(require("../../mocks/products.mock.json"));
const jwt_1 = require("../../mocks/jwt");
const services_1 = require("../../services");
setupDB_1.default();
const server = supertest_1.default(app_1.default);
describe("MP08 /manage-product/v1/brands?query,sort,limit,page", () => {
    test("should be return success", async () => {
        await services_1.createBrandService(products_mock_json_1.default.createBrandMock);
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
    const tokenMock = services_1.generateToken(jwt_1.payload, jwt_1.privateKey);
    test("should be return success", async () => {
        const response = await server
            .get('/manage-product/v1/brands/private?query=name%eq%test&limit=1$start=0&sort=-createdAt')
            .set('Authorization', `Bearer ${tokenMock}`);
        expect(response.status).toEqual(200);
    });
    test("missing header authorization should be return false", async () => {
        const response = await server
            .get('/manage-product/v1/brands/private?query=name%eq%test&limit=1$start=0,sort=-createdAt');
        expect(response.status).toEqual(401);
    });
});
describe("MP10 /manage-product/v1/brands/{id}", () => {
    test("get product public should return success", async () => {
        const brandMock = await services_1.createBrandService(products_mock_json_1.default.createBrandMock);
        const response = await server
            .get(`/manage-product/v1/brands/${brandMock.id}`);
        expect(response.status).toEqual(200);
    });
    test("invalid id should be return false", async () => {
        const response = await server
            .get(`/manage-product/v1/brands/${products_mock_json_1.default.fakeId}`);
        expect(response.status).toEqual(400);
    });
});
describe("MP11 /manage-product/v1/brands/private/{id}", () => {
    const tokenMock = services_1.generateToken(jwt_1.payload, jwt_1.privateKey);
    test("get product public should return success", async () => {
        const brandMock = await services_1.createBrandService(products_mock_json_1.default.createBrandMock);
        const response = await server
            .get(`/manage-product/v1/brands/private/${brandMock.id}`)
            .set('Authorization', `Bearer ${tokenMock}`);
        expect(response.status).toEqual(200);
    });
    test("invalid id should be return false", async () => {
        const response = await server
            .get(`/manage-product/v1/brands/private/${products_mock_json_1.default.fakeId}`)
            .set('Authorization', `Bearer ${tokenMock}`);
        expect(response.status).toEqual(400);
    });
});
describe("MP12 /manage-product/v1/brands", () => {
    const tokenMock = services_1.generateToken(jwt_1.payload, jwt_1.privateKey);
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
            .send(products_mock_json_1.default.createBrandMock);
        expect(response.status).toEqual(201);
    });
});
describe("MP13 /manage-product/v1/brands/{id}", () => {
    const tokenMock = services_1.generateToken(jwt_1.payload, jwt_1.privateKey);
    test("update brand should be success", async () => {
        const brandMock = await services_1.createBrandService(products_mock_json_1.default.createBrandMock);
        const response = await server
            .put(`/manage-product/v1/brands/${brandMock.id}`)
            .set('Authorization', `Bearer ${tokenMock}`)
            .set("Accept", "application/json")
            .send(products_mock_json_1.default.updateBrandMock);
        expect(response.status).toEqual(200);
    });
    test("body product is empty should be false", async () => {
        const brandMock = await services_1.createBrandService(products_mock_json_1.default.createBrandMock);
        const response = await server
            .put(`/manage-product/v1/brands/${brandMock.id}`)
            .set('Authorization', `Bearer ${tokenMock}`)
            .set("Accept", "application/json")
            .send({});
        expect(response.status).toEqual(400);
    });
    test("invalid id should return false", async () => {
        const response = await server
            .put(`/manage-product/v1/brands/${products_mock_json_1.default.fakeId}`)
            .set('Authorization', `Bearer ${tokenMock}`)
            .set("Accept", "application/json")
            .send({});
        expect(response.status).toEqual(400);
    });
});
describe("MP14 /manage-product/v1/brands/{id}", () => {
    const tokenMock = services_1.generateToken(jwt_1.payload, jwt_1.privateKey);
    test("delete brand should be success", async () => {
        const brandMock = await services_1.createBrandService(products_mock_json_1.default.createBrandMock);
        const response = await server
            .delete(`/manage-product/v1/brands/${brandMock.id}`)
            .set('Authorization', `Bearer ${tokenMock}`);
        expect(response.status).toEqual(204);
    });
    test("missing header authorization should be return false", async () => {
        const brandMock = await services_1.createBrandService(products_mock_json_1.default.createBrandMock);
        const response = await server
            .delete(`/manage-product/v1/brands/${brandMock.id}`);
        expect(response.status).toEqual(401);
    });
    test("invalid id should return false", async () => {
        const response = await server
            .delete(`/manage-product/v1/brands/${products_mock_json_1.default.fakeId}`)
            .set('Authorization', `Bearer ${tokenMock}`);
        expect(response.status).toEqual(400);
    });
});
