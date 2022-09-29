/*
* This file is only for connecting to arangodb
* */

const { Database } = require("arangojs");
const dotenv = require("dotenv");
dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const db_name = process.env.DATABASENAME;

async function connectToDB() {
	try {
		// Connection to ArangoDB
		const db = new Database({
			url: `http://${host}:${port}`,
			databaseName: db_name,
			auth: { username: username, password: password },
		});
		db.useDatabase("myapp_db");
		db.useBasicAuth("root", "root");
	} catch (e) {
		console.error(e)
	}
}
