const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
   Product.find()
      .exec()
      .then(doc => {
         if (doc) {
            res.status(200).send(doc)
         } else {
            res.status(404).send('No entry found')
         }
      })
      .catch(error => {
         res.status(404).send('documents not found')
      })
})

router.post('/', (req, res, next) => {
   const product = Product({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price
   })
   product.save().
      then(
         (result) => {
            console.log(result)
         }
      )
      .catch(error => console.log(error))

   res.status(201).json({
      msg: "Product was created",
      product
   })
})

router.get('/:productId', (req, res, next) => {
   const id = req.params.productId
   Product.findById(id)
      .exec()
      .then(doc => {
         if (doc.length > 0) {
            res.status(200).send(doc)
         } else {
            res.status(404).send('No valid entry found from provided id')
         }
      })
      .catch(error => {
         console.log(error)
         res.status(500).json({ error: error })
      })
})

router.patch('/productId', (req, res, next) => {
   const id = req.params.productId
   const updateOps = {}
   for(const ops of req.body){
      updateOps[ops.propName] = ops.value
   }
   Product.updateOne({ _id: id }, {
      $set: {updateOps}
   })
   .exec()
   .then(result =>{
      res.status(200).send(result)
   })
   .catch(err =>{
      res.status(500).send(err)
   })
})

router.delete('/productId', (req, res, next) => {
   const id = req.params.productId
   Product.remove({ _id: id })
      .exec()
      .then(result => {
         res.status(200).send(result)
      })
      .catch(err => {
         res.send(404).send('No valid entry found from provided id')
      })

})

module.exports = router