const router = require('express').Router()
const {verifyUser} = require("../utils/authenticate")
const Place = require('../models/Place')
const User = require('../models/User')
const Event = require('../models/Event')

router.post("/enter",verifyUser,async (req,res)=>{
    const {entrytime , locationid } = req.body
    try {
        const location = await Place.findById(locationid)
        const entryevent = await Event.create({entrytime : new Date(entrytime), location, entered : true , exited : false})
        let user = await User.findById(req.user._id)
        user.event.push(entryevent)
        await user.save()
        req.app.get("socketService").emitter("entry",req.user.college,{
            locationid : location._id,
            name : location.name,
            type : "entry"
        })
        req.app.get("socketService").adminemitter("entry",req.user.college,{
            locationid : location._id,
            name : location.name,
            person : {
                name : req.user.firstname + " " + req.user.lastname,
                role : req.user.role,
            },
            type : "entry"
        })
        res.status(200).json({event : entryevent})

    } catch (err) {
        res.status(409).json({error : "Failed to register event"})
    }
})

router.post("/:eventid/exit",verifyUser,async (req,res)=>{
    const {exittime } = req.body
    const {eventid} = req.params
    try {
        const location = await Place.findById(locationid)
        const exitevent = await Event.findByIdAndUpdate(eventid,{exittime : new Date(exittime) , entered : false, exited : true})
        await exitevent.save()

        req.app.get("socketService").emitter("exit",req.user.college,{
            locationid : location._id,
            name : location.name,
            type : "exit"
        })
        req.app.get("socketService").adminemitter("exit",req.user.college,{
            locationid : location._id,
            name : location.name,
            person : {
                name : req.user.firstname + " " + req.user.lastname,
                role : req.user.role,
            },
            type : "exit"
        })
        res.status(200).json({event : exitevent})

    } catch (err) {
        res.status(409).json({error : "Failed to register event"})
    }
})

module.exports = router