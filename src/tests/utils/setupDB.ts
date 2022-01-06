import { ProductModel } from "../../models";
import { Collection, connect, connection, disconnect } from "mongoose";

const setupDB = () => {
  beforeAll(() => connect(process.env["DB_MONGO_URL"])),
  afterEach(async() => {
    await Promise.all(Object.values(connection.collections).map(async (collection) => collection.drop()));
  })
  afterAll(() => disconnect());
}

export default setupDB;