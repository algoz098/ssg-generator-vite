const express = require('express')
const cors = require('cors')

const Validator = require('jsonschema').Validator;
const v = new Validator();

const json = require('./example')
const schema = require('./schema')

const validation = v.validate(json, schema)
if (!validation.valid) {
  console.log('Validation Errors: \n\r->', validation.errors.map(e => `${e.schema} ${e.message}`).join('\n\r->'))
  throw 'JSON\'s schema is not valid.'
}

const app = express()
const port = 5000

app.use(cors())
app.get('/', (req, res) => res.json(json))

app.listen(port, () => {
  console.log(`EXAMPLE JSON on ${port}`)
})
