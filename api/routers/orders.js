const express = require('express')
const { route } = require('./product')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send('handling get reqeust form orders')
})

router.post('/', (req, res, next) => {
  const order = {
    orderId: req.body.name,
    qunatity: req.body.qunatity
  }
  res.status(201).json({
    msg: "Order was created",
    order
  })
})

router.post('/orderId', (req, res, next) => {

})

router.patch('/orderId', (req, res, next) => {
  const id = req.params.orderId
  req.status(200).send(id)
})


router.delete('/productId', (req, res, next) => {
  const id = req.params.productId
  req.status(200).send(id)
})

module.exports = router