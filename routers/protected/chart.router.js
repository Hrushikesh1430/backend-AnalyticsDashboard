const express = require("express");
const router = express.Router();
const { Data } = require("../../models/chart.model");

router.get("/", async (req, res) => {
  try {
    const chartData = await Data.find({});
    res.status(200).json({ chartData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
