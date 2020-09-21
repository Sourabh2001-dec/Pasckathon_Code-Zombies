const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
  entered: { type: Boolean, default: false },
  exited: { type: Boolean, default: false },
  entrytime: { type: Date },
  exittime: { type: Date },
});

const Event = mongoose.model("event", eventSchema);

exports.default = Event;
