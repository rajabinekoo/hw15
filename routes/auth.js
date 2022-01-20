const express = require("express");
const router = express.Router();
const User = require("../models/users");
const {createUserSchema, loginSchema} = require("../validation/users");
const {validator, SchemaError} = require("../validation/index");
const {generateToken} = require("../utils/session");

router.post("/signup", validator(createUserSchema), async function (req, res) {
  try {
    const {username, password, gender, firstname, lastname} = req.body;
    await User.create({
      username,
      password,
      gender,
      firstname,
      lastname,
    });
    res.send({message: "Signed up successfully."});
  } catch (error) {
    if (error.code === 11000) {
      const fieldname = Object.keys(error.keyPattern)[0];
      return res
        .status(409)
        .send({
          errors: [new SchemaError(fieldname, `${fieldname} must be unique.`)],
        });
    }
    res.status(500).send({message: "Internal server error."});
  }
});

router.post("/login", validator(loginSchema), async function (req, res) {
  try {
    const {username, password} = req.body;
    const targetUser = await User.findOne({username, password});
    if (!targetUser) return res.status(404).send();
    const token = await generateToken(targetUser._id.toString());
    res.send({key: token, message: "Logged in successfully."});
  } catch (e) {
    res.status(500).send({message: "Internal server error."});
  }
})

module.exports = router;
