const assert = require('assert').strict
const adminService = require('../../src/services/admin.service')
const mongoose = require('mongoose')

describe('Admin Service', () => {

  before(async () => {
    console.log('connectando a mongo')
    await mongoose.connect('mongodb://localhost/ecommerce')
  })

  // beforeEach(() => {
  //   console.log('antes de cada prueba')
  // })

  after(() => {
    mongoose.disconnect()
  })

  // afterEach(() => {
  //   console.log('despues de cada prueba')
  // })

  it('should connect to the db', () => {
    assert.strictEqual(mongoose.connection.readyState, 1)
  })

  it('should retrieve admin stats', async () => {
    const stats = await adminService.getStats()

    console.log(stats)

    assert.strictEqual(stats.numProducts > 0, true)
  })
})
