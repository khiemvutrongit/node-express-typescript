"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.generateToken = (payload, privateKey) => {
    const signOptions = {
        expiresIn: "15m",
        algorithm: "RS256"
    };
    return jsonwebtoken_1.default.sign(payload, privateKey, signOptions);
};
