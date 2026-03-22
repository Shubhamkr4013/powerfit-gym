const mongoose = require("mongoose");

module.exports = mongoose.model("Booking", new mongoose.Schema({
  userId: String,
  plan: String,
  date: { type: Date, default: Date.now }
}));