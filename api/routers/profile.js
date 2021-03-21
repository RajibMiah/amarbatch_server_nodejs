const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const profileController = require("../controllers/profile")

router.get('/', checkAuth.jwtAuth , profileController.profileInfo)

router.post('/' , checkAuth.jwtAuth , profileController.profileEdit )

module.exports = router