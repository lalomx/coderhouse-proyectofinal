const userModel = require('./user.model')
const productModel = require('./product.model')

// abstract factory
class ModelFactory {
  static getModel(modelName) {
    switch (modelName) {
      case 'user':
        return userModel
      case 'pedido':
        return pedidoModel
      case 'product':
        return productModel
      // un case por cada modelo
      default:
        throw new Error('modelo no existe')
    }
  }
}

module.exports = ModelFactory
