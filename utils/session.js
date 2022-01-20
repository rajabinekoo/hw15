const User = require("../models/users");
const {v4: uuidv4} = require('uuid');
const Redis = require("ioredis");
const redis = new Redis();

async function tokenChecker(req, res, next) {
  try {
    const token = req.header("authorization");
    if (!token) return res.status(401).send();
    const targetUserId = await redis.get(token);
    if (!targetUserId) return res.status(401).send();
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return res.status(401).send();
    res.locals.user = targetUser;
    next();
  } catch (e) {
    res.status(500).send({message: "Something went wrong."})
  }
}

async function generateToken(userid) {
  const token = uuidv4();
  await redis.set(token, userid);
  await redis.expire(token, 1800);
  return token;
}

module.exports = {
  tokenChecker,
  generateToken
}