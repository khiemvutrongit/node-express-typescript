"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const app_1 = __importDefault(require("./app"));
const port = process.env["PORT"] || 3000;
mongoose_1.connect(process.env['DB_MONGO_URL']).then(() => {
    console.log("Connect database");
    app_1.default.listen(port, () => {
        console.log("Starting app");
        console.log(`http://localhost:${port}`);
    });
});
