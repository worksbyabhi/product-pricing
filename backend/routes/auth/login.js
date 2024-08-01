const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const router = express.Router();

router.post("", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    const d = await bcrypt.hash(password, 10);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.cookie("x-pp-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
      maxAge: 30 * 60 * 1000,
    });

    res.send({ username, role: user.role });
  } catch (err) {
    res.status(400).send({ error: "Invalid credentials" });
  }
});

module.exports = router;
