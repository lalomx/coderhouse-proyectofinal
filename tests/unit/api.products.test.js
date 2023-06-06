const supertest = require('supertest')
const expect = require('chai').expect
const createProduct = require('../util')

const URL = 'http://videogameecommerce.herokuapp.com'

describe('API Products', () => {

  const agent = supertest(URL)

  it('should retrieve all products', async () => {
    const response = await agent.get('/api/products')

    expect(response.status).to.equal(200)
  })

  it('should create new product', async () => {
    const product = createProduct()
    const response = await agent
      .post('/api/products')
      .send(product)

    const body = response.body

    expect(body.name).to.equal(product.name)
  })
})
