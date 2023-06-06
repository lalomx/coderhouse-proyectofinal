const { Router } = require('express')
const controller = require('../controllers/api.products.controller')

const authJwt = require('../middlewares/jwt.middleware')

const router = new Router()

module.exports = router
  // .use(authJwt)
  .get('/', controller.getAll)
  .get('/:id', controller.get)
  .post('/', controller.post)
  .delete('/:id', controller.delete)
