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
      let collinfo =  await College.findById(req.user.college).populate("locations");
      res.status(203).json({ college });
    } catch (err) {
      console.log(err.message);
      res.status(409).json({ error: "Failed to create the location" });
    }
  }
);

// router.post(
//   "/building",
//   verifyUser,
//   verifyAdmin,
//   checkUserCollege,
//   async (req, res) => {
//     let { name } = req.body;
//     try {
//       const college = await College.findById(req.user.college);
//       const building = await Building.create({ name });
//       college.buildings.push(building);
//       console.log(college.buildings.length);
//       await college.save();
//       res.status(201).json({ building });
//     } catch (err) {
//       console.log(err.message);
//       res.status(409).json({ error: "Falied to create the building" });
//     }
//   }
// );

// router.post(
//   "/building/:buildId/floor",
//   verifyUser,
//   verifyAdmin,
//   checkUserCollege,
//   async (req, res) => {
//     const { buildId } = req.params;
//     console.log(buildId);
//     let { name } = req.body;

//     try {
//       const college = await College.findById(req.user.college);

//       let found = false;
//       let tempcollege = college.toObject();
//       let buildwithfloor = tempcollege.buildings.map((building, index) => {
//         console.log(building.toString() === buildId);
//         console.log(building);
//         if (building.toString() === buildId) {
//           found = true;
//         }
//         return building;
//       });

//       if (found) {
//         let floor = await Floor.create({ name });
//         console.log(floor.toJSON());
//         let building = await Building.findById(buildId);
//         building.floors.push(floor);
//         await floor.save();
//         await building.save();
//         await college.save();
//         return res.status(201).json({ floor });
//       }
//       res.status(404).json("Building id not found");
//     } catch (err) {
//       console.log(err.message);
//       res.status(409).json({ error: "Falied to create the floor" });
//     }
//   }
// );

// router.post(
//   "/building/:buildId/floor/:floorId/class",
//   verifyUser,
//   verifyAdmin,
//   checkUserCollege,
//   async (req, res) => {
//     const { buildId, floorId } = req.params;
//     const { name, limit } = req.body;
//     let classroom;
//     try {
//       const college = await College.findById(req.user.college).populate(
//         "buildings"
//       );

//       let found = false;
//       let tempcollege = college.toObject();
//       let buildwithfloor = tempcollege.buildings.map((building, index) => {
//         console.log(building._id.toString() === buildId);
//         console.log(building);
//         if (building._id.toString() === buildId) {
//           let temp = building.floors.map((floor, findex) => {
//             if (floor.toString() === floorId) {
//               found = true;
//             }
//           });
//         }
//         return building;
//       });

//       if (found) {
//         classroom = await Place.create({ name, limit });
//         let floor = await Floor.findById(floorId);
//         floor.classes.push(classroom);
//         await classroom.save();
//         await floor.save();
//         await college.save();
//         return res.status(201).json({ class: classroom });
//       }
//       res.status(404).json({ error: "Floor not found" });
//     } catch (err) {
//       console.log(err.message);
//       res.status(409).json({ error: "Falied to create the class" });
//     }
//   }
// );

// router.post(
//   "/building/:buildId/floor/:floorId/other",
//   verifyUser,
//   verifyAdmin,
//   checkUserCollege,
//   async (req, res) => {
//     const { buildId, floorId } = req.params;
//     const { name, limit } = req.body;
//     let classroom;
//     try {
//       const college = await College.findById(req.user.college).populate(
//         "buildings"
//       );

//       let found = false;
//       let tempcollege = college.toObject();
//       let buildwithfloor = tempcollege.buildings.map((building, index) => {
//         console.log(building._id.toString() === buildId);
//         console.log(building);
//         if (building._id.toString() === buildId) {
//           let temp = building.floors.map((floor, findex) => {
//             if (floor.toString() === floorId) {
//               found = true;
//             }
//           });
//         }
//         return building;
//       });

//       if (found) {
//         classroom = await Place.create({ name, limit });
//         let floor = await Floor.findById(floorId);
//         floor.other.push(classroom);
//         await classroom.save();
//         await floor.save();
//         await college.save();
//         return res.status(201).json({ class: classroom });
//       }
//       res.status(404).json({ error: "Floor not found" });
//     } catch (err) {
//       console.log(err.message);
//       res.status(409).json({ error: "Falied to create the place" });
//     }
//   }
// );

// router.post(
//   "/building/:buildId/floor/:floorId/lab",
//   verifyUser,
//   verifyAdmin,
//   checkUserCollege,
//   async (req, res) => {
//     const { buildId, floorId } = req.params;
//     const { name, limit } = req.body;
//     let classroom;
//     try {
//       const college = await College.findById(req.user.college).populate(
//         "buildings"
//       );

//       let found = false;
//       let tempcollege = college.toObject();
//       let buildwithfloor = tempcollege.buildings.map((building, index) => {
//         console.log(building._id.toString() === buildId);
//         console.log(building);
//         if (building._id.toString() === buildId) {
//           let temp = building.floors.map((floor, findex) => {
//             if (floor.toString() === floorId) {
//               found = true;
//             }
//           });
//         }
//         return building;
//       });

//       if (found) {
//         classroom = await Place.create({ name, limit });
//         let floor = await Floor.findById(floorId);
//         floor.labs.push(classroom);
//         await classroom.save();
//         await floor.save();
//         await college.save();
//         return res.status(201).json({ class: classroom });
//       }
//       res.status(404).json({ error: "Floor not found" });
//     } catch (err) {
//       console.log(err.message);
//       res.status(409).json({ error: "Falied to create the lab" });
//     }
//   }
// );

module.exports = router;
