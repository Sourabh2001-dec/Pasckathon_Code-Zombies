const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");


const studentinfoSchema = new mongoose.Schema({
  rollno: {type : String, required : true},
  year: {
    type: String,
    required : [true,"current year of study is required"]
  },
  div: {type : String, required : [true,"current division is required"]},
});

const teacherfacultyinfoSchema = new mongoose.Schema({
  position: String,
});

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  role: {
    type: String,
    validate: {
      validator: function (role) {
        var roles = ["student", "teacher", "faculty", "guest"];
        if (roles.indexOf(role) !== -1) {
          return true;
        }
        return false;
      },
      message: (props) => `${props.value} is not a valid role!`,
    },
    required: [true, "User role is required"],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  studentinfo: studentinfoSchema,
  teacherinfo: teacherfacultyinfoSchema,
  facultyinfo: teacherfacultyinfoSchema,
  college: { type: mongoose.Schema.Types.ObjectId, ref: "College", required : [true, "College id is required"] },
  event: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

userSchema.options.toJSON = {
  transform: function(doc, ret, options) {
      ret.id = ret._id;
      delete ret.password;
      delete ret._id;
      delete ret.__v;
      return ret;
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
