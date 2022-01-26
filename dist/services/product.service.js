"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductService = exports.getProductsService = exports.deleteProductService = exports.updateProductService = exports.createProductService = void 0;
const http_status_1 = require("http-status");
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
exports.createProductService = (product) => {
    return models_1.ProductModel.create(product);
};
exports.updateProductService = async (id, payload, product) => {
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
    const document = await models_1.ProductModel.findOne({
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
exports.deleteProductService = async (id, payload) => {
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
    const document = await models_1.ProductModel.findOne({
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
exports.getProductsService = async (req, options) => {
    return models_1.ProductModel.paginate(req, options);
};
exports.getProductService = async (id) => {
    if (!mongoose_1.isValidObjectId(id)) {
        const error = new Error("Invalid Id");
        throw {
            status: http_status_1.BAD_REQUEST,
            message: error,
        };
    }
    return models_1.ProductModel.findOne({
        _id: new mongoose_1.Types.ObjectId(id),
        active: false,
    });
};
