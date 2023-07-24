import express from "express";
const homeController = require("./../controllers/homeController");

const router = express.Router();

// Welcome route
router.get("/", homeController.index);

// Login route
router.post("/login", homeController.login);

module.exports = router;
