const express = require('express')
const { route } = require('./product')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send('handling get reqeust form orders')
})

router.post('/', (req, res, next) => {
  res.status(200).send('handling post reqeust form orders')
})

router.post('/orderId', (req, res, next) => {
  const id =   req.params.orderId
  req.status(200).send(id)
})

router.patch('/orderId', (req, res, next) => {
  const id =   req.params.orderId
  req.status(200).send(id)
})


router.delete('/productId', (req, res, next) => {
  const id =   req.params.productId
  req.status(200).send(id)
})

module.exports = router