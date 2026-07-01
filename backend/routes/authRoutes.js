const express = require("express");
const router = express.Router();

const users = require("../models/User");

// REGISTER
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.json({ message: "User already exists" });
  }

  const user = {
    id: Date.now(),
    name,
    email,
    password
  };

  users.push(user);

  res.json({
    message: "User registered successfully",
    user
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user
  });
});

module.exports = router;