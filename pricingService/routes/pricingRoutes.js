const express = require("express");
const Pricing = require("../models/Pricing");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const records = await Pricing.find();
    res.send(records);
  } catch (error) {
    res.status(500).send({ error: "Error fetching data from the database" });
  }
});

router.post("/upload", async (req, res) => {
  const records = req.body;

  try {
    await Pricing.insertMany(records);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ error: "Error saving data to database" });
  }
});

module.exports = router;
