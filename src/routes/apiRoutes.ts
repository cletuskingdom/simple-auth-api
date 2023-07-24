import express from "express";
const homeController = require("./../controllers/homeController");

const router = express.Router();

// Welcome route
router.get("/", homeController.index);

// register route
router.post("/register", homeController.register);

module.exports = router;
