const arangojs = require("arangojs");
const dotenv = require("dotenv");


dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

// Connection to ArangoDB
db = new arangojs.databases({
    url: `http://${host}:${port}`,
    databaseName: databasename
});