const express = require('express')
const app = express()
const port = 3000
const productRoutes = require('./api/routers/product')
const orderRouter = require('./api/routers/orders')

app.use('/products' , productRoutes)
app.use('/orders', orderRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})