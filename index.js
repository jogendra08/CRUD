const connectToMongo = require('./db');

const express = require('express')

connectToMongo();

// app.set('view engine','ejs');
// app.set('views','views')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// routes
app.use('/api/products', require('./product'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

