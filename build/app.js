"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
// import mongoose from "mongoose";
dotenv_1.default.config({ path: __dirname + "/../config/.env" });
const app = (0, express_1.default)();
const port = process.env.PORT || 2000;
const DB_URL = process.env.NODE_ENV === "production"
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
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// STRUCTURE FOR INTERFACE
app.use(express_1.default.static("assets")); // this lets them know  where to find all your asset(fiels, css, fonts... etc)
// Route prefix - this points to all my routes
app.use("/api/v1", require("./routes/apiRoutes"));
// Start the server
app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
