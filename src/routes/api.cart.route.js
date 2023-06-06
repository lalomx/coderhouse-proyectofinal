const { Router } = require('express')
const cartModel = require('../models/cart.model')

const router = new Router()

router.get('/', async (req, res) => res.send(await cartModel.getAll()))

router.get('/:id', async (req, res) => {
  if (!req.params.id) {
    return res.sendStatus(404)
  }

  const cart = await cartModel.getById(req.params.id)
  return res.send(cart)
})

router.post('/:id/:productId', async (req, res) => {
  const { id, productId } = req.params

  if (!id) {
    return res.sendStatus(404)
  }

  if (!productId) {
    return res.sendStatus(404)
  }

  await cartModel.addProduct(id, productId)

  return res.sendStatus(200)
})

router.delete('/:id/:productId', async (req, res) => {
  const { id, productId } = req.params

  if (!id) {
    return res.sendStatus(404)
  }

  if (!productId) {
    return res.sendStatus(404)
  }

  await cartModel.removeProduct(id, productId)

  return res.sendStatus(200)
})

module.exports = router
