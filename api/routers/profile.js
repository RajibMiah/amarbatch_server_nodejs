const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const profileController = require("../controllers/profile")

router.get('/:profileId', checkAuth.jwtAuth, profileController.profileInfo)

module.exports = router