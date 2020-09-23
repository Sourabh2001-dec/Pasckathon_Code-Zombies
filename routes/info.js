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

module.exports = router;
