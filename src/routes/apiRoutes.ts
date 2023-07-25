import express from "express";
const homeController = require("./../controllers/homeController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// Welcome route
router.get("/", homeController.index);

// register route
router.post("/register", homeController.register);

// login route
router.post("/login", homeController.login);

// Get all users route
router.get("/users", validateToken, homeController.users);

module.exports = router;
