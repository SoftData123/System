const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");
const UserModel = require("../models/User"); // your user model

// GET /admin/register - protected route to check auth
router.get("/register", authMiddleware, (req, res) => {
  res.status(200).json({ success: true });
});

// POST /admin/register - create new user, protected
router.post("/register", authMiddleware, async (req, res) => {
  const { username, password } = req.body;

  try {
    // TODO: validate username/password, hash password, check if user exists, etc.
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const newUser = new UserModel({ username, password }); // remember to hash passwords!
    await newUser.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
