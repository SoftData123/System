const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');  // Your User mongoose model

// GET register route - no auth middleware
router.get('/register', (req, res) => {
  res.status(200).json({ success: true });
});

// POST login - you can keep auth logic here (optional)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: "Invalid credentials" });

    // If you want session support, you need to set up express-session middleware in your main app
    // If not, you can skip session and instead respond success or return a token (optional)

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST register - no auth middleware (open registration)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: "User registered" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST logout - you can remove this if you don't use sessions
router.post('/logout', (req, res) => {
  res.json({ success: true, message: "Logged out (no session implemented)" });
});

module.exports = router;
