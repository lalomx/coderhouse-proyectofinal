const ModelFactory = require('../../models/model.factory')
const productModel = ModelFactory.getModel('product')

module.exports = {
  createProduct: async ({ data }) => {
    // API
    // otras fuentes de datos
    return await productModel.save(data)
  },
  getAllProducts: ({ sort }) => productModel.getAll(sort),
}