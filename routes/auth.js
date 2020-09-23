const router = require("express").Router();
const { getToken, verifyAdmin, verifyUser } = require("../utils/authenticate");
const College = require("../models/College");
const User = require("../models/User");

// handle errors
const handleErrors = (err) => {
  //   console.log(err.message, err.code);
  let errors = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    role: "",
  };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "This email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "This password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = getToken({ id: user.toJSON().id });
    res.status(200).json({ user, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
});

router.post("/signup/guest", async (req, res) => {
  const { email, firstname, lastname, password, role, collegeid } = req.body;

  if (role == "guest") {
    try {
      const college = await College.findById(collegeid);
      const user = await User.create({
        email,
        firstname,
        lastname,
        password,
        role,
        college,
      });

      const token = getToken({ id: user.toJSON().id });
      res.status(201).json({ user, token });
    } catch (err) {
      console.log(err);
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  } else {
    res
      .status(403)
      .json({ error: "Cannot create account due to invalid account role" });
  }
});

router.post("/signup", verifyUser, verifyAdmin, async (req, res) => {
  const { email, firstname, lastname, password, role, collegeid } = req.body;

  if (!req.user.college === collegeid) {
    return res
      .status(403)
      .json({ error: "cannot create account due to invalid privilages" });
  }

  if (!req.body[role.toLowerCase() + "info"]) {
    return res.status(406).json({ error: "Insufficient information" });
  }
  try {
    const college = await College.findById(collegeid);
    let attr = {
      email,
      firstname,
      lastname,
      password,
      role: role.toLowerCase(),
      college,
    };
    attr[role.toLowerCase() + "info"] = req.body[role.toLowerCase() + "info"];
    const user = await User.create(attr);

    const token = getToken({ id: user.toJSON().id });
    return res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    return res.status(400).json({ errors });
  }
});

module.exports = router;
