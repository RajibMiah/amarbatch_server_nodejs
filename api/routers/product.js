const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
   Product.find()
   .exec()
   .then(doc =>{
      res.status(200).send(doc)
   })
   .catch(error =>{
      res.status(404).send('documents not found')
   })
   res.status(200).send('handling get reqeust form products')
})

router.post('/', (req, res, next) => {
    const product = Product({
       _id : mongoose.Types.ObjectId(),
       name : req.body.name,
       price : req.body.price
    })
    product.save().
    then(
       (result)=>{
         console.log(result)
       }
    )
    .catch(error=>console.log(error))

    res.status(201).json({
      msg: "Product was created",
      product
    })
})

router.get('/:productId', (req, res, next) => {
   const id =   req.params.productId
   Product.findById(id)
   .exec()
   .then(doc =>{
       console.log(doc)
       res.status(200).send(doc)
   })
   .catch(error =>{
       console.log(error)
       res.status(500).json({error:error})
   })
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