const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL,
        {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
        },
        () => {
                console.log("Connected to MongoDB !");
        }
);

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
        res.send("Welcome to homepage")
})

app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}...`)
});


