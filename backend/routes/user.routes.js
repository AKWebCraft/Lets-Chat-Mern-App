const express = require("express");
const auth = require("../middlewares/auth");
const userController = require("../controllers/user.controller");

const router = express.Router();

// GET ALL USERS
router.get("/", auth, userController.getAllUsers);

module.exports = router;
