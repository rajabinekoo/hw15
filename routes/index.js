const express = require("express");
const router = express.Router();
const {tokenChecker} = require("../utils/session");
const User = require("../models/users");

router.get("/", function (req, res) {
  res.render("index", {title: "Express"});
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.get("/dashboard", function (req, res) {
  res.render("dashboard");
});

router.get("/userinfo", tokenChecker, function (req, res) {
  delete res.locals.user._doc.password;
  delete res.locals.user._doc.__v;
  res.send(res.locals.user);
});

router.delete("/deleteAccount", tokenChecker, async function (req, res) {
  try {
    await User.findByIdAndDelete(res.locals.user._id);
    res.send({message: "Account deleted."});
  } catch (e) {
    res.status(500).send({message: "Internal server error."});
  }
})

router.put("/updateInfo", tokenChecker, async function (req, res) {
//  you have to implement it.
});

router.get("/login", function (req, res) {
  res.render("login");
});

module.exports = router;
