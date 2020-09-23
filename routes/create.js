const router = require("express").Router();
const Place = require("../models/Place");
const College = require("../models/College");
const User = require("../models/User");
const { verifyUser, verifyAdmin } = require("../utils/authenticate");

const checkUserCollege = (req, res, next) => {
  if (req.user.college !== null) {
    next();
  } else {
    return res.status(403).json({ error: "College need to be created first" });
  }
};

router.post("/college", verifyUser, verifyAdmin, async (req, res) => {
  let { name, studyyears } = req.body;

  if (!studyyears) {
    studyyears = [];
  }
  try {
    const college = await College.create({
      name,
      studyyears,
    });
    await User.findByIdAndUpdate(req.user._id, { college: college });
    res.status(201).json({ college });
  } catch (err) {
    console.log(err.message);
    res.status(409).json({ error: "Failed to create the college" });
  }
});

router.post(
  "/location",
  verifyUser,
  verifyAdmin,
  checkUserCollege,
  async (req, res) => {
    const { limit, name, type } = req.body;
    try {
      let college = await College.findById(req.user.college);
      let place = await Place.create({ name, limit, type });
      college.locations.push(place);
      await place.save();
      await college.save();
      let collinfo = await College.findById(req.user.college).populate(
        "locations"
      );
      res.status(203).json({ college });
    } catch (err) {
      console.log(err.message);
      res.status(409).json({ error: "Failed to create the location" });
    }
  }
);

module.exports = router;
