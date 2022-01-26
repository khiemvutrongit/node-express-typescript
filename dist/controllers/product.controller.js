"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductController = exports.UpdateProductController = exports.GetProductController = exports.GetProductsController = exports.CreateProductController = void 0;
const http_status_1 = require("http-status");
const services_1 = require("../services");
/**
 * Create a new product
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
exports.CreateProductController = async (req, res) => {
    try {
        const objCreateDocument = req.body;
        let result;
        try {
            result = await services_1.createProductService(objCreateDocument);
        }
        catch (error) {
            return res.status(http_status_1.BAD_REQUEST).json(error);
        }
        return res.status(http_status_1.CREATED).json(result);
    }
    catch (error) {
        return res.status(http_status_1.INTERNAL_SERVER_ERROR).json("Unexpected Error");
    }
};
/**
 * Get list product
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
exports.GetProductsController = async (req, res) => {
    try {
        const options = req.query;
        let result;
        try {
            result = await services_1.getProductsService(req, options);
        }
        catch (error) {
            return res.status(error.status || 400).json(error);
        }
        return res.status(http_status_1.OK).json(result);
    }
    catch (error) {
        return res.status(http_status_1.INTERNAL_SERVER_ERROR).json("Unexpected Error");
    }
};
/**
 * Get a product
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
exports.GetProductController = async (req, res) => {
    try {
        const { id } = req.params;
        let result;
        try {
            result = await services_1.getProductService(id);
        }
        catch (error) {
            return res.status(error.status).json(error);
        }
        if (!result) {
            const error = new Error("Not Found");
            return res.status(http_status_1.NOT_FOUND).json({
                status: http_status_1.NOT_FOUND,
                message: error,
            });
        }
        return res.status(http_status_1.OK).json(result);
    }
    catch (error) {
        return res.status(http_status_1.INTERNAL_SERVER_ERROR).json("Unexpected Error");
    }
};
/**
 * Update a product
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
exports.UpdateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { body, payload } = req;
        let result;
        try {
            result = await services_1.updateProductService(id, payload, body);
        }
        catch (error) {
            return res.status(error.status).json(error);
        }
        return res.status(http_status_1.OK).json(result);
    }
    catch (error) {
        return res.status(http_status_1.INTERNAL_SERVER_ERROR).json("Unexpected Error");
    }
};
/**
 * Get a product
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
exports.DeleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.payload;
        try {
            await services_1.deleteProductService(id, payload);
        }
        catch (error) {
            return res.status(error.status || http_status_1.BAD_REQUEST).json(error);
        }
        return res.status(204).json();
    }
    catch (error) {
        return res.status(http_status_1.INTERNAL_SERVER_ERROR).json("Unexpected Error");
    }
};
