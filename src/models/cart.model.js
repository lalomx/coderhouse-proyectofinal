const { Schema, Types } = require('mongoose')
const BaseModel = require('./base.model')

class CartModel extends BaseModel {
  constructor() {
    const schema = new Schema({
      userId: String,
      products: { type: [String], default: [] },
    })

    super(schema, 'cart')
  }

  async getByUser(id) {
    const cart = await this.model.findOne({ userId: id }).lean()
    if (!cart) {
      return {}
    }

    return this.toObj(cart)
  }

  async addProduct(id, productId) {
    const cart = await this.model.findById(Types.ObjectId(id))
    if (cart.products.includes(productId)) {
      return
    }

    cart.products.push(productId)

    await cart.save()
  }

  async removeProduct(id, productId) {
    const cart = await this.model.findById(Types.ObjectId(id))
    if (!cart.products.includes(productId)) {
      return
    }

    cart.products = cart.products.filter((pId) => pId !== productId)

    await cart.save()
  }

  async emptyCartByUser(userId) {
    const cart = await this.model.findOne({ userId })

    cart.products = []

    await cart.save()
  }
}

module.exports = new CartModel()
