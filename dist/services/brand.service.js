"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrandsService = exports.getBrandService = exports.deleteBrandService = exports.updateBrandService = exports.createBrandService = void 0;
const models_1 = require("../models");
const http_status_1 = require("http-status");
const mongoose_1 = require("mongoose");
exports.createBrandService = (brand) => {
    return models_1.BrandModel.create(brand);
};
exports.updateBrandService = async (id, payload, product) => {
    if (!mongoose_1.isValidObjectId(id)) {
        const error = new Error("Invalid Id");
        throw {
            status: http_status_1.BAD_REQUEST,
            message: error,
        };
    }
    if (!payload) {
        const error = new Error("Missing payload");
        throw {
            status: http_status_1.BAD_REQUEST,
            message: error,
        };
    }
    if (Object.keys(product).length === 0) {
        const error = new Error("Invalid Data Update");
        throw {
            status: http_status_1.BAD_REQUEST,
            message: error,
        };
    }
    const document = await models_1.BrandModel.findOne({
        _id: id,
        accountId: payload.acc,
        active: false,
    });
    if (!document) {
        const error = new Error("Not Found");
        throw {
            status: http_status_1.NOT_FOUND,
            message: error,
        };
    }
    Object.assign(document, product);
    await document.save();
    return document;
};
exports.deleteBrandService = async (id, payload) => {
    if (!mongoose_1.isValidObjectId(id)) {
        const error = new Error("Invalid Id");
        throw {
            status: http_status_1.BAD_REQUEST,
            message: error,
        };
    }
    if (!payload) {
        const error = new Error("Missing payload");
        throw {
            status: http_status_1.BAD_REQUEST,
            message: error,
        };
    }
    const document = await models_1.BrandModel.findOne({
        _id: new mongoose_1.Types.ObjectId(id),
        accountId: payload.acc,
        active: false,
    });
    if (!!!document) {
        const error = new Error("Not Found");
        throw {
            status: http_status_1.NOT_FOUND,
            message: error,
        };
    }
    document.active = true;
    return document.save();
};
exports.getBrandService = async (id) => {
    if (!mongoose_1.isValidObjectId(id)) {
        const error = new Error("Invalid Id");
        throw {
            status: http_status_1.BAD_REQUEST,
            message: error,
        };
    }
    return models_1.BrandModel.findOne({
        _id: new mongoose_1.Types.ObjectId(id),
        active: false,
    });
};
exports.getBrandsService = (req, options) => {
    return models_1.BrandModel.paginate(req, options);
};
