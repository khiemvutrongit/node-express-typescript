"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBrandController = exports.UpdateBrandController = exports.GetBrandController = exports.GetBrandsController = exports.CreateBrandController = void 0;
const http_status_1 = require("http-status");
const services_1 = require("../services");
/**
 * Create a Brand
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
exports.CreateBrandController = async (req, res) => {
    try {
        const objectCreateDocument = req.body;
        let result;
        try {
            result = await services_1.createBrandService(objectCreateDocument);
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
exports.GetBrandsController = async (req, res) => {
    try {
        const options = req.query;
        let result;
        try {
            result = await services_1.getBrandsService(req, options);
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
 * Get a Brand
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
exports.GetBrandController = async (req, res) => {
    try {
        const { id } = req.params;
        let result;
        try {
            result = await services_1.getBrandService(id);
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
 * Update a Brand
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
exports.UpdateBrandController = async (req, res) => {
    try {
        const { id } = req.params;
        const { body, payload } = req;
        let result;
        try {
            result = await services_1.updateBrandService(id, payload, body);
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
exports.DeleteBrandController = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.payload;
        try {
            await services_1.deleteBrandService(id, payload);
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
