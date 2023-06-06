const http = require('http')
const createProduct = require('../util')

const data = JSON.stringify(createProduct())

console.log(data)
const options = {
  hostname: 'videogameecommerce.herokuapp.com',
  port: 80,
  path: '/api/products',
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'content-length': data.length,
  },
}

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`)

  res.on('data', (datos) => {
    process.stdout.write(datos)
  })
})

req.on('error', (e) => console.log(e))

req.write(data)
req.end()
