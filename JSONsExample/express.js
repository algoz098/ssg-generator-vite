const json = require('./example')
const express = require('express')

const app = express()
const port = 5000
app.get('/', (req, res) => res.json(json))

app.listen(port, () => {
  console.log(`EXAMPLE JSON on ${port}`)
})
