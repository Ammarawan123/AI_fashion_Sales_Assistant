const express = require("express");
const router = express.Router();

let customers = [];

// ADD CUSTOMER
router.post("/add", (req, res) => {
  const customer = req.body;
  customers.push(customer);

  res.json({
    message: "Customer added successfully",
    customer
  });
});

// GET CUSTOMERS
router.get("/all", (req, res) => {
  res.json(customers);
});

module.exports = router;