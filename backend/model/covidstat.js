var mongoose = require("mongoose");

var CovisStatSchema = new mongoose.Schema({
  "Detected State": { type: String, required: true },
  "Current Status": { type: String, required: true },
  Gender: { type: String, required: true },
  "Age Bracket": { type: Number, required: true },
  "Date Announced": { type: String, required: true },
});

module.exports = mongoose.model("covidstat", CovisStatSchema);