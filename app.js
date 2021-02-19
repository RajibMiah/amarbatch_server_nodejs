const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const port = 3000
const productRoutes = require('./api/routers/product')
const orderRouter = require('./api/routers/orders')
try {
   mongoose.connect('mongodb://amarbatch:12345@amarbatch.xnfl5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true });
} catch (error) {
  handleError(error);
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors handler
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type,Accept ,Authorization')
  // if(req.method === 'OPTIONS'){
  //   res.header('Access-Control-Allow-Methods','PUT', 'POST', 'PATCH' , 'DELETE')
  //   return res.status(200).json({})
  // }
})

app.use(morgan('dev'))
app.use('/products', productRoutes)
app.use('/orders', orderRouter)


app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.send(error.message)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})