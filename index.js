const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv= require("dotenv");

dotenv.config();
const PORT = process.env.POST || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {useNewUrlParser: true}, () =>  {
        console.log("Connected to MongoDB !");
});

app.listen(POST, () => {
        console.log(`Server is listening on port ${PORT}...`)
});