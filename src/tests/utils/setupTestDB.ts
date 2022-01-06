import app from "../../app";
const mongoose = require('mongoose');
const port = process.env['PORT'];

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(process.env['DB_MONGO_URL']).then(() => {
      console.log("Connect database");
      app.listen(port, () => {
        console.log("Starting app");
        console.log(`http://localhost:${port}`);
      });
    });
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection: any) => collection.deleteMany()));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
