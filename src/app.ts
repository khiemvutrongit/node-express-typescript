import * as dotenv from 'dotenv';
const path = require('path');

dotenv.config({
	path: path.resolve(__dirname, `../docker/.env.${process.env['DEVELOP_ENV']}`)
});

import express, { json, urlencoded } from "express";
import status from "http-status";
import routes from "./routes";
const app = express();

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