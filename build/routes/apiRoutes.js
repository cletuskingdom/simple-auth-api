"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController = require("./../controllers/authController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express_1.default.Router();
// Welcome route
router.get("/", authController.index);
// register route
router.post("/register", authController.register);
// login route
router.post("/login", authController.login);
// Get all users route
router.get("/users", validateToken, authController.users);
module.exports = router;
