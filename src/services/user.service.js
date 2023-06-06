const ModelFactory = require('../models/model.factory')

class UserService {
  constructor() {
    this.userModel = ModelFactory.getModel('user')
    this.pedidosModel = ModelFactory.getModel('pedido')
  }

  async getAllWithOrders() {
    const users = this.userModel.getAll()
    // eslint-disable-next-line no-restricted-syntax
    for (const user of users) {
      // eslint-disable-next-line no-await-in-loop
      user.pedidos = await this.pedidosModel.getAllByUser(user._id)
    }

    return users
  }
}

module.exports = new UserService()
