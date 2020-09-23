const router = require("express").Router();
const College  = require("../models/College");
const Place = require("../models/Place")
const { verifyUser, verifyAdmin } = require("../utils/authenticate");

router.get("/college", verifyUser, verifyAdmin, async (req, res) => {
  try {
    let college = await College.findById(req.user.college).populate({path : 'locations',model : "Place"})
    res.status(200).json({ college });
  } catch (err) {
    console.log(err.message,err.stack);
    res.status(404).json({ error: "College not found" });
  }
});


router.get("/schedule",verifyUser,
(req, res, next) => {
  if (req.user.role === "student") {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "You dont have privilages for this action" });
  }
},
async (req,res)=>{
  const studclass = req.user.studentinfo.year + "-" + req.user.studentinfo.div
  try {
    let college = await College.findById(req.user.college).populate('locations')
    let schedules = []
    college.locations.forEach(location => {
      location.reservations.forEach(reservation => {
        if (reservation.allowedclass.indexOf(studclass) !== -1){
          schedules.push(reservation)
        }
      })
    })
    res.status(400).json({schedules})
  } catch (error) {
    console.log(error.message)
    res.json({error : "Failed to get schedules"})
  }
})

module.exports = router;
