const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const profileController = require("../controllers/profile")
const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({
  storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
  }
})

router.get('/', checkAuth.jwtAuth, profileController.profileInfo)

router.post('/', checkAuth.jwtAuth, profileController.profileEdit)

router.post('/uploadprofile', checkAuth.jwtAuth , upload.single('image'), profileController.uploadProfile)

module.exports = router