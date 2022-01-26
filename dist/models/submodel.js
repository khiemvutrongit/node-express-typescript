"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let envVar = process.env["DEVELOP_ENV"] === 'prod' ? 'prod' : 'dev';
let subModel;
if (envVar === 'dev') {
    subModel = {
        products: 'products_test',
        brands: 'brands_test',
        categories: 'categories_test',
        kinds: "kinds_test",
        conditions: "conditions_test",
        imageLibrary: "image_library_test"
    };
}
if (envVar === 'prod') {
    subModel = {
        products: 'products',
        brands: 'brands',
        categories: 'categories',
        kinds: "kinds",
        conditions: "conditions",
        imageLibrary: "image_library"
    };
}
exports.default = subModel;
