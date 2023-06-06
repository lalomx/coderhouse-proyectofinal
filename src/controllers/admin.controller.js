const productModel = require('../models/product.model')
const pedidoModel = require('../models/pedido.model')

const adminService = require('../services/admin.service')

module.exports = {
  main: async (req, res) => {
    // solicitar a la capa de servicios las estadisticas
    // capa de servicio solicita datos a los modelos (capa de persistencia)
    const stats = await adminService.getStats()
    console.log(stats)

    res.render('admin/index', { ...stats })
  },
  getUsers: async (req, res) => {
    // Escribir la logica de negocio
    // podemos crear una capa extra
    // capa de servicio

    // obtengo datos de la capa de modelo/persistencia
    const users = await adminService.getUsers()

    res.render('admin/tableUsers', { users })
  },
  getProducts: async (req, res) => {
    const products = await productModel.getAll()
    res.render('admin/table', {
      title: 'Productos',
      add: '/admin/add/product',
      products,
    })
  },
  getPedidos: async (req, res) => {
    const pedidos = await pedidoModel.getAll()
    res.render('admin/pedidosTable', { title: 'Pedidos', pedidos })
  },
  addProduct: (req, res) => res.render('admin/productAdd'),
  createProduct: async (req, res) => {
    const { body } = req
    try {
      await productModel.save(body)
      res.render('admin/success')
    } catch (error) {
      res.render('admin/error', { error })
    }
  },
  addUser: (req, res) => res.render('admin/userAdd'),
}
