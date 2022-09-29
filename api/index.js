const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");


dotenv.config();
const PORT = process.env.PORT || 8000;

const options = {
	autoIndex: false, // Don't build indexes
	maxPoolSize: 10, // Maintain up to 10 socket connections
	serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(process.env.MONGO_URL, options,
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
app.use("/api/v1/post", postRoute);

app.get("/", (req, res) => {
	res.send("Welcome to homepage")
})

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`)
});


