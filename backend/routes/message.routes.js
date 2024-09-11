const express = require("express");
const messageController = require("../controllers/message.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

// GET MESSAGES
router.get("/:id", auth, messageController.getMessages);

// SEND MESSAGES
router.post("/send", auth, messageController.sendMessage);

module.exports = router;
