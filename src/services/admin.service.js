const userModel = require('../models/user.model')
const pedidoModel = require('../models/pedido.model')
const productModel = require('../models/product.model')

module.exports = {
  getUsers: async () => {
    // regresar el array de usuarios
    const users = await userModel.getAll()

    // transformacion de datos
    return users
  },
  getStats: async () => ({
    numPedidos: await pedidoModel.count(),
    numUsers: await userModel.count(),
    numProducts: await productModel.count(),
  }),
}
