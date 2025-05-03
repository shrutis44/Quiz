const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  verified: { type: Boolean, default: false },
  otp: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Player", playerSchema);
