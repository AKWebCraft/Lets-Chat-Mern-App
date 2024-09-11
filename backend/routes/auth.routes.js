const express = require("express");
const authController = require("../controllers/auth.controllers");

const router = express.Router();

// REGISTER
router.post("/signup", authController.signup);

// LOGIN
router.post("/login", authController.login);

// LOGOUT
router.get("/logout", authController.logout);

// REFRESH
router.get("/refresh", authController.refresh);

module.exports = router;
