const mongoose = require("mongoose");

// const floorSchema = new mongoose.Schema({
//   classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
//   other: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
//   labs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
//   name: {
//     type: String,
//     required: [true, "Please provide name to the floor"],
//   },
// });

// const buildingSchema = new mongoose.Schema({
//   floors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Floor" }],
//   name: {
//     type: String,
//     required: [true, "Please provide name to the building"],
//   },
// });

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "College name is required"],
  },
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
  studyyears: [
    {
      type: new mongoose.Schema({
        name: String,
        divisions: [{ type: String }],
      }),
    },
  ],
});

const College = mongoose.model("College", collegeSchema);

module.exports = College;
