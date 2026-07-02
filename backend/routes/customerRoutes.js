const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.post("/add", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({ message: "Customer added successfully", customer });
  } catch (error) {
    res.status(400).json({ message: "Failed to add customer", error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch customers", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch customer", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer updated successfully", customer });
  } catch (error) {
    res.status(400).json({ message: "Failed to update customer", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete customer", error: error.message });
  }
});

module.exports = router;
