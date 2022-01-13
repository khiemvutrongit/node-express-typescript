import { connect, connection, disconnect } from "mongoose";

const setupDB = () => {
  beforeAll(async () => await connect(process.env["DB_MONGO_URL"]));
  afterEach(async () => {});
  afterAll(async () => {
    await Promise.all(
      Object.values(connection.collections).map(async (collection) =>
        collection.drop()
      )
    );
    await disconnect();
  });
};

export default setupDB;
