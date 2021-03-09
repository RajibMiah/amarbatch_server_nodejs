const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/signin', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Auth Failed"
        })
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'auth failed'
          })
        }
        if (result) {
          const token = jwt.sign({
            email: user.email,
            id: user._id
          },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );

          res.status(200).json({
            message: 'login successfull',
            token: token
          })
        }
        res.status(401).json({
          message: 'auth failed'
        })
      })
    })
    .catch(err => {
      error: err
    })
})

router.post('/signup', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.status(409).json({
          message: "email exist"
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err
            })
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            })
            user.save()
              .then(result => {
                res.status(201).json({
                  message: 'user created'
                })
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                })
              })
          }
        })
      }
    }
    )
})

router.delete('/:userId', (req, res, next) => {
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
})

module.exports = router