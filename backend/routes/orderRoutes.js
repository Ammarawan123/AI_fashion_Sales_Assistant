const express = require("express");
const router = express.Router();

let orders = [];

// CREATE ORDER
router.post("/add", (req, res) => {
  const order = req.body;

  orders.push({
    id: Date.now(),
    ...order,
    status: "pending"
  });

  res.json({
    message: "Order placed successfully",
    order
  });
});

// GET ALL ORDERS
router.get("/all", (req, res) => {
  res.json(orders);
});

module.exports = router;