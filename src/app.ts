import dotenv from "dotenv";
import express from "express";
import bodyParser from 'body-parser'; // Optional, but helpful for parsing request bodies


// import mongoose from "mongoose";
dotenv.config({ path: __dirname + "/../config/.env" });

const app = express();
const port = process.env.PORT || 2000;

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