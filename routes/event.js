const router = require("express").Router();
const { verifyUser } = require("../utils/authenticate");
const Place = require("../models/Place");
const User = require("../models/User");
const Event = require("../models/Event");
const { incrcount, decrcount, getCount } = require("../utils/count");

router.post("/enter", verifyUser, async (req, res) => {
  const { entrytime, locationid } = req.body;
  if (!entrytime) {
    return res.json({ error: "Entry time not given" });
  } else if (!locationid) {
    return res.json({ error: "Location id not given" });
  }
  try {
    let ongoing = await User.findById(req.user._id).populate("event");
    ongoing.event.forEach((event) => {
      if (event.entered === true) {
        return res.json({ error: `${event._id} is already going on` });
      }
    });
    const location = await Place.findById(locationid);
    console.log(location);
    if (!(getCount(req.user.college, locationid) < location.limit)) {
      return res.json({ denied: "Your entry is denied" });
    }
    const entryevent = await Event.create({
      entrytime: new Date(entrytime),
      location: location,
      entered: true,
      exited: false,
    });
    let user = await User.findById(req.user._id);
    user.event.push(entryevent);
    await user.save();
    let data = incrcount(req.user.college, location._id.toString());
    req.app.get("socketService").emiter("entry", req.user.college, data);
    req.app.get("socketService").adminemiter("entry", req.user.college, {
      eventinfo: {
        locationid: location._id,
        name: location.name,
        person: {
          name: req.user.firstname + " " + req.user.lastname,
          role: req.user.role,
        },
        type: "entry",
      },
      data,
    });
    res.status(200).json({ event: entryevent });
  } catch (err) {
    console.log(err.message);
    res.status(409).json({ error: "Failed to register event" });
  }
});

router.post("/:eventid/exit", verifyUser, async (req, res) => {
  const { exittime } = req.body;
  const { eventid } = req.params;
  if (!exittime) {
    return res.json({ error: "Exittime not given" });
  }
  try {
    let exitevent = await Event.findById(eventid);
    if (exitevent.exited) {
      return res.json({ error: "User already exited" });
    }
    exitevent = await Event.findByIdAndUpdate(eventid, {
      exittime: new Date(exittime),
      entered: false,
      exited: true,
    }).populate("location");
    console.log(exitevent);
    await exitevent.save();
    exitevent = await Event.findById(eventid);
    let data = decrcount(req.user.college, location._id.toString());
    req.app.get("socketService").emiter("exit", req.user.college, data);
    req.app.get("socketService").adminemiter("exit", req.user.college, {
      eventinfo: {
        locationid: exitevent.location._id,
        name: exitevent.location.name,
        person: {
          name: req.user.firstname + " " + req.user.lastname,
          role: req.user.role,
        },
        type: "exit",
      },
      data,
    });
    res.status(200).json({ event: exitevent });
  } catch (err) {
    console.log(err.message);
    res.status(409).json({ error: "Failed to register event" });
  }
});

router.post(
  "/:locationid/reserve",
  verifyUser,
  (req, res, next) => {
    if (req.user.role === "teacher") {
      next();
    } else {
      return res
        .status(403)
        .json({ error: "You dont have privilages for this action" });
    }
  },
  async (req, res) => {
    const { locationid } = req.params;
    let { starttime, endtime, description, allowedclass } = req.body;
    if (!starttime) {
      return res.json({ error: "starttime is required" });
    } else if (!endtime) {
      return res.json({ error: "endtime is required" });
    }

    if (!description) {
      description = "";
    }

    if (!allowedclass) {
      allowedclass = [];
    }

    try {
      let location = await Place.findById(locationid);
      let reserver = await User.findById(req.user._id);
      location.reservations.push({
        starttime: new Date(starttime),
        endtime: new Date(endtime),
        description,
        allowedclass,
        reservedby: reserver,
        reservername: reserver.firstname + " " + reserver.lastname,
      });
      location.save();
      reserver.toObject();
      res.status(203).json({
        starttime,
        endtime,
        description,
        allowedclass,
        reservedby: reserver.firstname + " " + reserver.lastname,
      });
    } catch (error) {
      console.log(error.message);
      res.json({ error: "Failed to create reservation" });
    }
  }
);

module.exports = router;
