const got = require('got')
const createProduct = require('../util')

const PRODUCTS_URL = 'http://videogameecommerce.herokuapp.com/api/products'

async function main() {
  try {
    const product = createProduct()
    const responsePost = await got.post(PRODUCTS_URL, product)

    console.log(responsePost.statusCode)
    const response = await got(PRODUCTS_URL)

    console.log(response.body)
  } catch (e) {
    console.log(e)
  }
}

main()
