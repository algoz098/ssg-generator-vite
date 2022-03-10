const axios = require('axios')
const shell = require('shelljs');
const env = require('dotenv').config().parsed

async function main() {
  const { data } = await axios.get(env.VITE_STRUCTURE_API)
  const arg = Buffer.from(JSON.stringify(data), 'utf-8').toString('base64')
  const generate = shell.exec(`npm run generate -- --structures=${arg}`)
  if (generate.code !== 0) {
    throw "Could not generate"
  }

  console.log('--> SUCCESS')
}

main()