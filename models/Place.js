const mongoose = require('mongoose')

const timeslotSchema = mongoose.Schema({
    starttime : {type : Date, required : [true,"Please enter start time!"]},
    endtime : {type : Date, required : [true,"Please enter end time!"]},
    allowedclass : [{type:String}],
    reservedby : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const placeSchema  = new mongoose.Schema({
    limit : {type : Number , required : [true,"Please provide people limit!"]},
    name : {
        type : String,
        require : [true,"Please provide name to the place"]
    },
    reservations : [{type : timeslotSchema}]
})

const Place = mongoose.model("Building",placeSchema)

module.exports = Place