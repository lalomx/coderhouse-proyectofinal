const axios = require('axios')
const createProduct = require('../util')

const PRODUCTS_URL = 'http://videogameecommerce.herokuapp.com/api/products'

async function main() {
  const product = createProduct()
  try {
    const response = await axios.post(PRODUCTS_URL, product)

    console.log(response.status)

    const { data } = await axios.get(PRODUCTS_URL)
    console.log(data[data.length - 1].name, product.name)
  } catch (e) {
    console.log(e)
  }
}

main()
