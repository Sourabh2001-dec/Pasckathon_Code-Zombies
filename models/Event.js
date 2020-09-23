const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Place", required : [true,"Location is required"] },
  entered: { type: Boolean, default: false },
  exited: { type: Boolean, default: false },
  entrytime: { type: Date },
  exittime: { type: Date },
  timelimit : {type : String},
  description : {type : String , default : ''}
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
