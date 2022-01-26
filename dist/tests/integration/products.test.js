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
describe("MP01 GET /manage-product/v1/products?query,sort,limit,start", () => {
    test("should be return success", async () => {
        await services_1.createProductService(products_mock_json_1.default.createProductMock);
        const response = await server
            .get("/manage-product/v1/products?limit=10&start=0&sort=-createdAt");
        expect(response.status).toEqual(200);
    });
    test("query by field & limit & start should be return success", async () => {
        const response = await server
            .get(`/manage-product/v1/products?query=name%like%test`);
        expect(response.status).toEqual(200);
    });
});
describe("MP02 GET /manage-product/v1/products/private?query,sort,limit,start", () => {
    const tokenMock = services_1.generateToken(jwt_1.payload, jwt_1.privateKey);
    test("should be return success", async () => {
        const response = await server
            .get("/manage-product/v1/products/private")
            .set('Authorization', `Bearer ${tokenMock}`);
        expect(response.status).toEqual(200);
    });
    test("missing header authorization should be return false", async () => {
        const response = await server
            .get(`/manage-product/v1/products/private?limit=10&start=0&sort=-createdAt&query=name%like%test`);
        expect(response.status).toEqual(401);
    });
    test("query by field & limit & start should be return success", async () => {
        const response = await server
            .get(`/manage-product/v1/products/private?limit=10&start=0&sort=-createdAt&query=price%eq%1000000`)
            .set('Authorization', `Bearer ${tokenMock}`);
        expect(response.status).toEqual(200);
    });
});
describe("MP03 GET /manage-product/v1/products/{id}", () => {
    test("get product public should return success", async () => {
        const productMock = await services_1.createProductService(products_mock_json_1.default.createProductMock);
        const response = await server
            .get(`/manage-product/v1/products/${productMock.id}`);
        expect(response.status).toEqual(200);
    });
    test("invalid id should be return false", async () => {
        const response = await server
            .get(`/manage-product/v1/products/${products_mock_json_1.default.fakeId}`);
        expect(response.status).toEqual(400);
    });
});
describe("MP04 GET /manage-product/v1/products/private/{id}", () => {
    const tokenMock = services_1.generateToken(jwt_1.payload, jwt_1.privateKey);
    test("get one product private should return success", async () => {
        const productMock = await services_1.createProductService(products_mock_json_1.default.createProductMock);
        const response = await server
            .get(`/manage-product/v1/products/private/${productMock.id}`)
            .set('Authorization', `Bearer ${tokenMock}`);
        expect(response.status).toEqual(200);
    });
    test("invalid id private should be return false", async () => {
        const response = await server
            .get(`/manage-product/v1/products/private/${products_mock_json_1.default.fakeId}`)
            .set('Authorization', `Bearer ${tokenMock}`);
        expect(response.status).toEqual(400);
    });
});
describe("MP05 POST /manage-product/v1/products", () => {
    const tokenMock = services_1.generateToken(jwt_1.payload, jwt_1.privateKey);
    // missing parameter should return false
    test("missing parameter body should return false", async () => {
        const response = await server
            .post("/manage-product/v1/products")
            .set('Authorization', `Bearer ${tokenMock}`)
            .set("Accept", "application/json")
            .send({});
        expect(response.status).toEqual(400);
    });
    // should return success
    test("should return success", async () => {
        const response = await server
            .post("/manage-product/v1/products")
            .set('Authorization', `Bearer ${tokenMock}`)
            .set("Accept", "application/json")
            .send(products_mock_json_1.default.createProductMock)
            .expect(201);
        expect(response.status).toEqual(201);
    });
});
describe("MP06 PUT /manage-product/v1/products/{id}", () => {
    const tokenMock = services_1.generateToken(jwt_1.payload, jwt_1.privateKey);
    test("update product should be success", async () => {
        const productMock = await services_1.createProductService(products_mock_json_1.default.createProductMock);
        const response = await server
            .put(`/manage-product/v1/products/${productMock.id}`)
            .set('Authorization', `Bearer ${tokenMock}`)
            .set("Accept", "application/json")
            .send(products_mock_json_1.default.updateProductMock);
        expect(response.status).toEqual(200);
    });
    test("body product is empty should be success", async () => {
        const productMock = await services_1.createProductService(products_mock_json_1.default.createProductMock);
        const response = await server
            .put(`/manage-product/v1/products/${productMock.id}`)
            .set('Authorization', `Bearer ${tokenMock}`)
            .set("Accept", "application/json");
        expect(response.status).toEqual(400);
    });
    test("invalid id parameter should be return false", async () => {
        const response = await server
            .put(`/manage-product/v1/products/${products_mock_json_1.default.fakeId}`)
            .set('Authorization', `Bearer ${tokenMock}`)
            .set("Accept", "application/json")
            .send({});
        expect(response.status).toEqual(400);
    });
});
describe("MP07 DELETE /manage-product/v1/products/{id}", () => {
    const tokenMock = services_1.generateToken(jwt_1.payload, jwt_1.privateKey);
    test("delete should return success", async () => {
        const productMock = await services_1.createProductService(products_mock_json_1.default.createProductMock);
        const response = await server
            .delete(`/manage-product/v1/products/${productMock.id}`)
            .set('Authorization', `Bearer ${tokenMock}`)
            .set("Accept", "application/json")
            .send({});
        expect(response.status).toEqual(204);
    });
    test("missing header authorization should be return false", async () => {
        const response = await server
            .delete(`/manage-product/v1/products/${products_mock_json_1.default.fakeId}`)
            .set("Accept", "application/json")
            .send({});
        expect(response.status).toEqual(401);
    });
    test("invalid id should return false", async () => {
        const response = await server
            .delete(`/manage-product/v1/products/${products_mock_json_1.default.fakeId}`)
            .set('Authorization', `Bearer ${tokenMock}`)
            .set("Accept", "application/json")
            .send({});
        expect(response.status).toEqual(400);
    });
});
