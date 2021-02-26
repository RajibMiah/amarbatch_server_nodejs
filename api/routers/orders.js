const express = require('express')
const { route } = require('./product')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/order')
const Products = require('../models/product')

router.get('/', (req, res, next) => {
  Order.find()
    .select('product quantity _id')
    .then(result => {
      if (result.length > 0) {
        res.status(200).json({
          count: result.length,
          orders: result,
          request: {
            type: 'GET',
            URL: 'http://localhost:3000/orders/' + result._id
          }
        })
      }
    })
    .catch(err => {
      res.status(404).json({
        error: err
      })
    })
})

router.post('/', (req, res, next) => {
  Products.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: 'product is not found'
        })
      }
      const Order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      })
      return Order.save()
    })
    .exec()
    .then(result => {
      res.status(202).json({
        message: 'Order was created',
        orders: {
          order: result
        }
      })
    })
    .catch(err => {
      res.send(500).json({
        error: err
      })
    })
})

router.post('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then(order => {
      if (!order) {
        res.status(404).json({
          message: "Order not found"
        })
      } else {
        res.status(200).json({
          order: doc,
          request: {
            type: 'GET',
            description: 'you can get all orders',
            url: 'http://localhost:3000/orders/'
          }
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: error })
    })
})

router.patch('/:orderId', (req, res, next) => {
  const id = req.params.orderId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Order.updateOne({ _id: id }, {
    $set: { updateOps }
  })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order Updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders/' + result._id
        }
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
})


router.delete('/:productId', (req, res, next) => {
  const id = req.params.orderId
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'order deleted'
      })
    })
    .catch(err => {
      res.send(404).send('No valid entry found from Order id')
    })

})

module.exports = router