import * as dotenv from 'dotenv';

dotenv.config({
	path: `../docker/.env.${process.env['DEVELOP_ENV']}`
});

import express, { json, urlencoded } from "express";
import status from "http-status";
import { connect } from 'mongoose';
import routes from "./routes";
const app = express();

connect(process.env['DB_MONGO_URL']).then(() => {
	console.log("Connect database");
}).catch((error) => {
	console.log(error);
});

app.use(json());
app.use(
	urlencoded({
		extended: true,
	})
);

app.use(process.env['ROOT_PATH'], routes);

app.use("*", (req, res) => {
	return res.status(status.NOT_FOUND).json({
		status: 404,
		message: "not found",
	});
});

export default app;