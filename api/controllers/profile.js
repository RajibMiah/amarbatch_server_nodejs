
const mongoose = require('mongoose')
const User = require('../models/user')


exports.profileInfo = async (req, res, next) => {
  try {
    console.log('userid', req.userData.id)
    const profile = await User.findById(req.userData.id)
    if (profile) {
      res.status(201).json({
        message: 'user profile fatched',
        code: 'SUCCESS',
        data: {
          profileImage: profile.profile,
          userName: profile.userName,
          email: profile.email,
          phoneNo: profile.phoneNo,
          bio: profile.bio,
          education: profile.education
        }
      })
    }
  } catch (error) {
    res.status(500).json({
      Error: error,
    })
  }
}

exports.profileEdit = async (req, res, next) => {
  console.log("reqeust body", req.body)
  try {

    const result = await User.findByIdAndUpdate(req.userData.id, {
      $set: req.body
    })
    // console.log('result', result)
    res.status(200).json({
      msg: 'SUCCESS'
    })
  }
  catch (error) {
    res.status(500).json({
      Error: error,
    })
  }
}

exports.uploadProfile = async(req, res, next) => {
  console.log("path"  , req.file.path)
  try {
    const result = await User.findByIdAndUpdate(req.userData.id, {
      $set:{profile: req.file.path} 
    })
    res.status(200).json({
       msg:"success",
       result
    })
  } catch (error) {
    console.log('error' , error)
    res.status(500).json({
      error: error,
      msg:'not uploaded'
    })
  }
  
}