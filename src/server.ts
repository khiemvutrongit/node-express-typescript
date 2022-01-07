import { connect } from "mongoose";
import app from "./app";
const port = process.env["PORT"] || 3000;

connect(process.env['DB_MONGO_URL']).then(() => {
	console.log("Connect database");
	app.listen(port, () => {
		console.log("Starting app");
		console.log(`http://localhost:${port}`);
	});
});
