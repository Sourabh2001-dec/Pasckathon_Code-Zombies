const mongoose = require("mongoose");

const timeslotSchema = new mongoose.Schema({
  starttime: { type: Date, required: [true, "Please enter start time!"] },
  endtime: { type: Date, required: [true, "Please enter end time!"] },
  description: { type: String, default: "" },
  allowedclass: [{ type: String }],
  reservedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reservername : String
});

const placeSchema = new mongoose.Schema({
  limit: { type: Number, required: [true, "Please provide people limit!"] },
  name: {
    type: String,
    required: [true, "Please provide name to the place"],
  },
  type: { type: String, enum: ["class", "other", "lab"] },
  reservations: [timeslotSchema],
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
