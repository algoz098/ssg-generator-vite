const json = require('./example')
const express = require('express')
const cors = require('cors')

const app = express()
const port = 5000

app.use(cors())
app.get('/', (req, res) => res.json(json))

app.listen(port, () => {
  console.log(`EXAMPLE JSON on ${port}`)
})
