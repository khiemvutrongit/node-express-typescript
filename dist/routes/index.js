"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const product_router_1 = __importDefault(require("./v1/product.router"));
const brand_router_1 = __importDefault(require("./v1/brand.router"));
router.use("/products", product_router_1.default);
router.use("/brands", brand_router_1.default);
exports.default = router;
