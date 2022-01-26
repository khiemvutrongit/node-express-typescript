"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtPayload = void 0;
const bearerRegex = /^Bearer\ /;
const http_status_1 = require("http-status");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function getJwtPayload(headers, publicKey) {
    try {
        const authorization = headers['authorization'];
        if (!authorization // authorization does not exist
            || typeof authorization !== "string" // authorization is not a string
            || !bearerRegex.test(authorization) // authorization not starts with `Bearer `
        ) {
            throw {
                status: http_status_1.UNAUTHORIZED,
                message: new Error("Invalid authorization header")
            };
        }
        // remove `Bearer ` from auth header to get token
        const token = authorization.replace(bearerRegex, "");
        if (!`${publicKey}`.trim().length) {
            throw {
                status: http_status_1.UNAUTHORIZED,
                message: new Error("Unable to verify jwt")
            };
        }
        try {
            const verifyOptions = {
                algorithms: [
                    "RS256",
                ]
            };
            return jsonwebtoken_1.default.verify(token, publicKey, verifyOptions);
        }
        catch (error) {
            error.status = http_status_1.UNAUTHORIZED;
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
}
exports.getJwtPayload = getJwtPayload;
