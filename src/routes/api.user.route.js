const { Router } = require('express')
// const userModel = require('../models/user.model')
const cartModel = require('../models/cart.model')
const ModelFactory = require('../models/model.factory')

const userModel = ModelFactory.getModel('user')

const router = new Router()

router.get('/', async (req, res) => {
  console.log(userModel)
  const users = await userModel.getAll()
  // TODO: agregar pedidos a usuario
  console.log(users)
  res.send(users)
})

router.get('/current', async (req, res) => {
  if (!req.session) {
    return res.sendStatus(404)
  }

  const userId = req.session.passport.user
  const user = await userModel.getById(userId)
  const cart = await cartModel.getByUser(userId)

  return res.send({
    ...user,
    cartId: cart.id,
  })
})

router.get('/:id', async (req, res) => {
  const userId = req.params.id
  if (!userId) {
    return res.sendStatus(404)
  }

  const user = await userModel.getById(userId)
  const cart = await cartModel.getByUser(userId)

  return res.send({
    ...user,
    cartId: cart.id,
  })
})

router.post('/', async (req, res) => {
  const { body } = req // { email: alguien@example.com }

  /// capa de negocio
  // recibimos la info de la vista
  // utilizamos un DTO (la informacion)
  // nos comunicamos con el DAO
  // ejecutamos el metodo de creacion
  // el dao guarda la informacion en la DB

  await userModel.save(body)

  return res.sendStatus(201)
})

module.exports = router
