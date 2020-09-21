const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema({
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
  other: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
  labs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
  name: {
    type: String,
    require: [true, "Please provide name to the floor"],
  },
});

const buildingSchema = new mongoose.Schema({
  floors: [{ type: floorSchema }],
  name: {
    type: String,
    require: [true, "Please provide name to the building"],
  },
});

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "College name is required"],
  },
  buildings: [{ type: buildingSchema }],
  studyyears: [
    [new mongoose.Schema({ name: String, divisions: [{ type: String }] })],
  ],
});

const College = mongoose.model("college", collegeSchema);

module.exports = College;
