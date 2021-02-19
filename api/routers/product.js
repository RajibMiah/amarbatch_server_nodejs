const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
   res.status(200).send('handling get reqeust form products')
})

router.post('/', (req, res, next) => {
   const product = {
      productId: req.body.name,
      price : req.body.price
    }
    res.status(201).json({
      msg: "Product was created",
      order
    })
})

router.post('/productId', (req, res, next) => {
   const id =   req.params.productId
   req.status(201).send(id)
})

router.patch('/productId', (req, res, next) => {
   const id =   req.params.productId
   req.status(200).send(id)
})

router.delete('/productId', (req, res, next) => {
   const id =   req.params.productId
   req.status(200).send(id)
})

module.exports = router