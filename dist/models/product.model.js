"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const paginate_plugin_1 = require("./plugins/paginate.plugin");
const submodel_1 = __importDefault(require("./submodel"));
const ProductSchema = new mongoose_1.Schema({
    accountId: {
        type: String,
        required: true,
        select: false,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    publicQuantity: {
        type: Boolean,
        default: false,
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0,
    },
    publicPrice: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        min: 0,
    },
    conditions: [
        {
            type: String,
        },
    ],
    brands: [
        {
            type: String,
        },
    ],
    categories: [
        {
            type: String,
        },
    ],
    technicalSpecifications: {
        type: String,
        maxlength: 1000,
    },
    productFrom: {
        type: String,
    },
    createdBy: String,
    modifiedBy: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
    active: {
        type: Boolean,
        default: false,
        select: false
    },
    public: {
        type: Boolean,
        default: false,
        select: false
    },
}, {
    versionKey: false,
});
// add plugin that paginate
ProductSchema.plugin(paginate_plugin_1.paginate);
exports.ProductModel = mongoose_1.model(submodel_1.default.products, ProductSchema);
