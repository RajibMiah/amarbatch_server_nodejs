const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')
const multer = require('multer')
// const upload = multer({dest:'upload/'})
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, '/tmp/my-uploads')
   },
   filename: function (req, file, cb) {
     cb(null, file.fieldname + '-' + Date.now())
   }
 })
  
 var upload = multer({ storage: storage , limits:{
    fileSize: 1024 * 1024 * 5
 }})

router.get('/', (req, res, next) => {
   Product.find()
      .select('name price _id')
      .exec()
      .then(doc => {
         if (doc) {
            const response = {
               count: doc.length,
               products: doc,
               _id: doc._id,
               request: {
                  type: 'GET',
                  url: 'http://localhost:3000/products/' + doc._id
               }
            }
            res.status(200).send(response)
         } else {
            res.status(404).send('No entry found')
         }
      })
      .catch(error => {
         res.status(404).send('documents not found')
      })
})

router.post('/',upload.single('productImage') ,  (req, res, next) => {
   const product = Product({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price
   })
   product.save().
      then(
         (result) => {
            res.status(201).json({
               msg: "Product was created successfully",
               createdProduct:{
                  name: result.name,
                  price: result.price,
                  _id : result._id,
                  request:{
                     type:'GET',
                     URL:'http://localhost:3000/products'+result._id
                  }
               }
            })
         }
      )
      .catch(error => console.log(error))


})

router.get('/:productId', (req, res, next) => {
   const id = req.params.productId
   Product.findById(id)
      .exec()
      .then(doc => {
         if (doc.length > 0) {
            res.status(200).json({
               product:doc,
               request:{
                  type:'GET',
                  description:'you can get all products',
                  url: 'http://localhost:3000/products/'
               }
            })
         } else {
            res.status(404).send('No valid entry found from provided id')
         }
      })
      .catch(error => {
         console.log(error)
         res.status(500).json({ error: error })
      })
})

router.patch('/:productId', (req, res, next) => {
   const id = req.params.productId
   const updateOps = {}
   for (const ops of req.body) {
      updateOps[ops.propName] = ops.value
   }
   Product.updateOne({ _id: id }, {
      $set: { updateOps }
   })
      .exec()
      .then(result => {
         res.status(200).json({
            message:'Product Updated',
            request:{
               type:'GET',
               url:'http://localhost:3000/products/'+ result._id
            }
         })
      })
      .catch(err => {
         res.status(500).send(err)
      })
})

router.delete('/:productId', (req, res, next) => {
   const id = req.params.productId
   Product.remove({ _id: id })
      .exec()
      .then(result => {
         res.status(200).json({
            message:'Product deleted'
         })
      })
      .catch(err => {
         res.send(404).send('No valid entry found from provided id')
      })

})

module.exports = router