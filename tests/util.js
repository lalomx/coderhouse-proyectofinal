const faker = require('faker')

const createProduct = () => ({
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  description: faker.commerce.productDescription(),
  platform: faker.random.arrayElement(['Xbox', 'PS4', 'Nintendo']),
})

module.exports = createProduct
