const { Router } = require('express')
const auth = require('../middlewares/auth.middleware')
const productModel = require('../models/product.model')
const cartModel = require('../models/cart.model')
const pedidoModel = require('../models/pedido.model')

const mailSender = require('../notifications/mail')

const router = Router()

router.get('/', auth, async (req, res) => {
  const { id } = req.user

  // const products = await productModel.getAll();
  const cart = await cartModel.getByUser(id)

  res.render('index', { cartId: cart.id })
})

router.get("/chat", auth, (req, res) => {
  res.render("chat")
})

router.get('/carrito', auth, async (req, res) => {
  const { id } = req.user

  const cart = await cartModel.getByUser(id)
  const products = await Promise.all(
    cart.products.map((pId) => productModel.getById(pId))
  )
  const total = products.reduce((tot, p) => tot + p.price, 0)

  return res.render('carrito', { cartId: cart.id, products, total })
})

router.get('/pedido', auth, async (req, res) => {
  const { id, email } = req.user
  const context = { sent: false }

  const cart = await cartModel.getByUser(id)
  const products = await Promise.all(
    cart.products.map((pId) => productModel.getById(pId))
  )

  const total = products.reduce((tot, p) => tot + p.price, 0)

  try {
    await pedidoModel.save({
      userId: id,
      total,
    })
    await cartModel.emptyCartByUser(id)

    /// Integracion con el mail
    // [ { name: Conker, price: 4000} ]
    // [<li>Conker</li>, <li>Conker</li>, <li>Conker</li>]
    // const elementosDeProducto = products.map((p) => `<li>${p.name}</li>`)
    // const template = `
    //   <h1 style='color: blue;'> Tu pedido esta siendo procesado </h1>
    //   <p>Aqui tus productos: </p>
    //   <ul>
    //     ${elementosDeProducto.join(' ')}
    //   </ul>

    //   <img src='pedido.png />
    // `
    // mailSender.send(template, email)
    context.sent = true
  } catch (e) {
    console.log(e)
  }

  return res.render('pedido', context)
})

module.exports = router
