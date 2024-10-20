const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

// @route   POST /auth/register
// @desc    Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  try {
    const newUser = await user.save();
    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   POST /auth/login
// @desc    Login user and return JWT
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;

