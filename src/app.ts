import dotenv from "dotenv";
import express from "express";
// import mongoose from "mongoose";
dotenv.config({ path: __dirname + "/../config/.env" });

const app = express();
const port = process.env.PORT || 2000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// STRUCTURE FOR INTERFACE
app.use(express.static("assets")); // this lets them know  where to find all your asset(fiels, css, fonts... etc)

// Set template engine
app.set("view engine", "ejs");

// Route prefix - this points to all my routes
app.use("", require("./routes/routes"));

// Start the server
app.listen(port, () => {
	console.log(`Server listening on port http://localhost:${port}`);
});