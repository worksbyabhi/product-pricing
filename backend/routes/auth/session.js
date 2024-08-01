const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const { username, role } = req.loggedInUser;
  res.send({ username, role });
});

module.exports = router;
