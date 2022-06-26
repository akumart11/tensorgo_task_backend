const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validator.isEmail,
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ["male", "female"],
    },
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["active", "inactive"],
    },
  },
});

const User = mongoose.model("UserMaster", userSchema);

module.exports = User;
