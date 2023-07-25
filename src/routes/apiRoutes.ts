import express from "express";
const authController = require("./../controllers/authController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// Welcome route
router.get("/", authController.index);

// register route
router.post("/register", authController.register);

// login route
router.post("/login", authController.login);

// Get all users route
router.get("/users", validateToken, authController.users);

module.exports = router;
