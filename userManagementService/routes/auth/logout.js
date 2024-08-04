const express = require("express");
const router = express.Router();

router.get("", async (req, res) => {
  const token = req.cookies["x-pp-token"] ?? "";

  res.cookie("x-pp-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  res.sendStatus(200);
});

module.exports = router;
