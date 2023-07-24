"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// import mongoose from "mongoose";
dotenv_1.default.config({ path: __dirname + "/../config/.env" });
const app = (0, express_1.default)();
const port = process.env.PORT || 2000;
// middleware
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// STRUCTURE FOR INTERFACE
app.use(express_1.default.static("assets")); // this lets them know  where to find all your asset(fiels, css, fonts... etc)
// Route prefix - this points to all my routes
app.use("", require("./routes/apiRoutes"));
// Start the server
app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
