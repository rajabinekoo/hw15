const express = require("express");
const router = express.Router();
const User = require("../models/users");
const { createUserSchema } = require("../validation/users");
const { validator, SchemaError } = require("../validation/index");

router.post("/", validator(createUserSchema), async function (req, res) {
  try {
    const { username, password, gender, firstname, lastname } = req.body;
    await User.create({
      username,
      password,
      gender,
      firstname,
      lastname,
    });
    res.send("respond with a resource");
  } catch (error) {
    if (error.code === 11000) {
      const fieldname = Object.keys(error.keyPattern)[0];
      return res
        .status(409)
        .send({
          errors: [new SchemaError(fieldname, `${fieldname} must be unique.`)],
        });
    }
    res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;
