const { Schema } = require('mongoose')
const BaseModel = require('./base.model')

class Product extends BaseModel {
  constructor() {
    const schema = new Schema({
      name: String,
      platform: String,
      price: Number,
      description: String,
      img: String,
    })

    super(schema, 'product')
  }
}

module.exports = new Product()
