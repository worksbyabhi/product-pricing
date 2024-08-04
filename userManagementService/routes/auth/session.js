const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
  const token = req.cookies["x-pp-token"];
  const isNginxRequest = req.headers["x-from-nginx"];

  if (!token) {
    return res.status(401).send({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, role } = decoded;

    if (isNginxRequest) {
      res.set("X-Pp-User", JSON.stringify({ username, role }));
      res.set("X-Pp-Token", token);
      res.set(
        "X-Pp-Token-Expiry",
        new Date(Date.now() + 30 * 60 * 1000).toISOString()
      );
      res.sendStatus(200);
    } else {
      res.cookie("x-pp-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 60 * 1000,
      });
      res.status(200).send({ username, role });
    }
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
});

module.exports = router;
