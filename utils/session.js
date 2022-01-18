const {v4: uuidv4} = require('uuid');
const User = require("../models/users");

function Session(id) {
  this.userId = id;
  this.key = uuidv4();
}

async function tokenChecker(req, res, next) {
  try {
    const userKey = req.header("authorization");
    if (!userKey) return res.status(401).send();
    const targetSession = global.sessionList.find(el => el.key === userKey);
    if (!targetSession) return res.status(401).send();
    const targetUser = await User.findById(targetSession.userId);
    if (!targetUser) return res.status(401).send();
    res.locals.user = targetUser;
    next();
  } catch (e) {
    res.status(500).send({message: "Something went wrong."})
  }
}

global.sessionList = [];

module.exports = {
  Session,
  tokenChecker,
}