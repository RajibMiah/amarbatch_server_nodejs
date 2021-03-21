
const mongoose = require('mongoose')
const User = require('../models/user')

exports.profileInfo = (req, res, next) => {
  const profile = User.findOne({ id: req.body.userId })
  console.log("profile", profile)
}