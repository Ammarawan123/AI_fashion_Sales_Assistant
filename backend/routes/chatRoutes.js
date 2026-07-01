const express = require("express");
const router = express.Router();

// SIMPLE CHAT LOGIC (NO AI API NEEDED)

router.post("/", (req, res) => {
  const message = req.body.message.toLowerCase();

  let reply = "Sorry, I didn't understand that.";

  if (message.includes("hi") || message.includes("hello")) {
    reply = "Hello! 👋 How can I help you with our products?";
  }

  if (message.includes("price")) {
    reply = "Our products start from Rs 1500 and go up to Rs 5000.";
  }

  if (message.includes("delivery")) {
    reply = "Delivery takes 3–5 working days.";
  }

  if (message.includes("order")) {
    reply = "You can place an order by sending product name and quantity.";
  }

  res.json({ reply });
});

module.exports = router;