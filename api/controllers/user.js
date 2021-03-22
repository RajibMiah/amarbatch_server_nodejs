
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt');
const checkAuth = require("../middleware/check-auth")
const multer = require('multer')
// const upload = multer({dest:'upload/'})

exports.signin = async (req, res, next) => {
  const user = await User.findOne({ classId: req.body.classId })
  if (!user) {
    res.status(401).json({
      message: "Auth Failed",
      code: 'UNAUTHORIZED'
    })

  } else {
    const verify = bcrypt.compare(req.body.password, user.password)
    if (verify) {
      const jwt = checkAuth.jwtGenerator({
        email: user.email,
        id: user._id
      })
      res.status(200).json({
        message: 'login successfull',
        token: jwt,
        code: 'SUCCESS'
      })
    } else {
      res.status(401).json({
        message: "Auth Failed",
        code: 'UNAUTHORIZED'
      })
    }
  }
}

exports.singup = (req, res, next) => {
  console.log('signup---->>', req.body)
  User.find({ classId: req.body.classId })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        console.log('user', user)
        res.status(409).json({
          message: "class id is already exist",
          code: 'UNAUTHORIZED'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err,
            })
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              userName: req.body.userName,
              classId: req.body.classId,
              phoneNo: req.body.phoneNo,
              password: hash
            })
            user.save()
              .then(result => {
                const token = jwt.sign({
                  email: user.email,
                  id: user._id
                },
                  process.env.JWT_SECRET,
                  { expiresIn: '1h' }
                );
                res.status(201).json({
                  message: 'user created',
                  code: 'SUCCESS',
                  token: token
                })
              })
              .catch(err => {
                res.status(500).json({
                  message: 'internal server error',
                  code: 'UNAUTHORIZED'
                })
              })
          }
        })
      }
    }
    )
    .catch(err => {
      res.status(401).json({
        error: err
      })
    })
}

exports.userId =  (req, res, next) => {
  User.remove({ id: req.body.userId })
    .exec()
    .then(result => {
      res.status(500).json({
        message: "user deleted"
      })
    })
    .catch(err => {
      error: err
    })
}