const http = require('http')

const options = {
  hostname: 'videogameecommerce.herokuapp.com',
  port: 80,
  path: '/api/products',
  method: 'GET',
}

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`)

  res.on('data', (datos) => {
    process.stdout.write(datos)
  })
})

req.on('error', (e) => console.log(e))

req.end()
