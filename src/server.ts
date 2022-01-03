require("dotenv").config({ path: '../docker/develop.env' });
import express, { json, urlencoded } from "express";
const app = express();
const port = process.env["PORT"] || 3000;
import routes from "./routes";

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use("", routes);

app.listen(port, () => {
  console.log("  Starting app ");
  console.log(`  http://localhost:${port}`);
});
