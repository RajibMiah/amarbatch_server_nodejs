
const mongoose = require('mongoose')
const User = require('../models/user')

exports.profileInfo = async (req, res, next) => {
  try {
    const profile = await User.findById(req.params.profileId )
    if (profile) {
      res.status(201).json({
        message: 'user profile fatched',
        code: 'SUCCESS',
        data: {
          userName : profile.userName,
          email: profile.email,
          phoneNo: profile.phoneNo,
          bio : profile.bio,
          education: profile.education
        }
      })
    }
  } catch (error)  {
       res.status(500).json({
        Error: error,
    })
  }
}