const express = require("express");
const router = express.Router();

let products = []; // temporary storage (no database)

// ADD PRODUCT
router.post("/add", (req, res) => {
  const product = req.body;
  products.push(product);

  res.json({
    message: "Product added successfully",
    product
  });
});

// GET ALL PRODUCTS
router.get("/all", (req, res) => {
  res.json(products);
});

module.exports = router;