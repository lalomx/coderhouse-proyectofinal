const { Router } = require('express')
const auth = require('../middlewares/auth.middleware')
const controller = require('../controllers/admin.controller')

const router = Router()

module.exports = router
  .use(auth)
  .get('/', controller.main)
  .get('/users', controller.getUsers)
  .get('/products', controller.getProducts)
  .get('/pedidos', controller.getPedidos)
  .get('/add/product', controller.addProduct)
  .post('/add/product', controller.createProduct)
  .get('/add/user', controller.addUser)
