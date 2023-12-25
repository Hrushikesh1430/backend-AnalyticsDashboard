const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
  Day: String,
  Age: String,
  Gender: String,
  A: Number,
  B: Number,
  C: Number,
  D: Number,
  E: Number,
  F: Number,
});

const Data = mongoose.model("Data", dataSchema);

module.exports = { Data };
