const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')




router.post('/signin', userController.signin)

router.post('/signup', userController.singup)

router.delete('/:userId', userController.userId)


module.exports = router