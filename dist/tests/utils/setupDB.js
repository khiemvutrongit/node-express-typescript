"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const setupDB = () => {
    beforeAll(async () => await mongoose_1.connect(process.env["DB_MONGO_URL"]));
    afterEach(async () => { });
    afterAll(async () => {
        await Promise.all(Object.values(mongoose_1.connection.collections).map(async (collection) => collection.drop()));
        await mongoose_1.disconnect();
    });
};
exports.default = setupDB;
