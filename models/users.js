const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: [4, "username should be greater then 4 character."],
    maxLength: [20, "username should be less then 20 character."],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [8, "password should be greater then 8 character."],
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "firstname should be greater then 3 character."],
    maxLength: [20, "firstname should be less then 20 character."],
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "lastname should be greater then 3 character."],
    maxLength: [20, "lastname should be less then 20 character."],
  },
  gender: {
    type: String,
    trim: true,
    enum: ["male", "female", ""]
  },
});

module.exports = User;
