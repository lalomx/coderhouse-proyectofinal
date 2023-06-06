const productModel = require('../models/product.model')

module.exports = {
  getAll: async (req, res) => res.send(await productModel.getAll()),
  post: async (req, res) => {
    const { body } = req

    const newProductId = await productModel.save(body)

    return res.status(201).send(newProductId)
  },
  get: async (req, res) => {
    if (!req.params.id) {
      return res.sendStatus(404)
    }
    const product = await productModel.getById(req.params.id)

    if (!product) {
      return res.sendStatus(404)
    }

    return res.send(product)
  },
  delete: async (req, res) => {
    const { id } = req.params

    if (!id) {
      return res.sendStatus(404)
    }

    await productModel.delete(id)

    return res.sendStatus(200)
  },
  put: (req, res) => {},
}
