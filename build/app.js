import dotenv from "dotenv";
import express from "express";
const mongoose = require("mongoose");
import bodyParser from "body-parser"; // Optional, but helpful for parsing request bodies

// import mongoose from "mongoose";
dotenv.config({ path: __dirname + "/../config/.env" });

const app = express();
const port = process.env.PORT || 2000;

const DB_URL =
	process.env.NODE_ENV === "production"
		? process.env.PRODUCTION_DB_URL
		: process.env.LOCAL_DB_URL;

// database connection
mongoose.connect(DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to the database!"));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// STRUCTURE FOR INTERFACE
app.use(express.static("assets")); // this lets them know  where to find all your asset(fiels, css, fonts... etc)

// Route prefix - this points to all my routes
app.use("/api/v1", require("./routes/apiRoutes"));

// Start the server
app.listen(port, () => {
	console.log(`Server listening on port http://localhost:${port}`);
});
