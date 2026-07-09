const express = require("express");
const router = express.Router();
const { getChatResponse } = require("../services/aiChatService");

router.post("/", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const result = await getChatResponse(message, sessionId);
    res.json(result);
  } catch (error) {
    console.error("Chat route failed:", error.message);
    res.status(500).json({ message: "Something went wrong while processing your message" });
  }
});

module.exports = router;
