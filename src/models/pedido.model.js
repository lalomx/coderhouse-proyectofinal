const { Schema } = require('mongoose')
const moment = require('moment')
const BaseModel = require('./base.model')

class Pedido extends BaseModel {
  constructor() {
    const schema = new Schema({
      userId: String,
      total: { type: Number, default: 0 },
      created: { type: Date, default: Date.now },
      enviado: Boolean,
    })

    super(schema, 'pedido')
  }

  async getAll() {
    const data = await this.model.find({}).lean()

    return data.map((pedido) => ({
      ...this.toObj(pedido),
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado ? 'Si' : 'No',
    }))
  }

  async save(obj) {
    const pedido = await super.save(obj)
    return {
      ...pedido,
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado ? 'Si' : 'No',
    }
  }

  async getById(id) {
    const pedido = await super.getById(id)

    if (!pedido) {
      return null
    }

    return {
      ...pedido,
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado ? 'Si' : 'No',
    }
  }

  async getByUser(id) {
    const pedido = await this.model.findOne({ userId: id }).lean()

    if (!pedido) {
      return null
    }

    return {
      ...this.toObj(pedido.toObject()),
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado ? 'Si' : 'No',
    }
  }

  async getAllByUser(id) {
    const pedidos = await this.model.find({ userId: id }).lean()

    if (!pedidos) {
      return []
    }

    return pedidos.map((pedido) => ({
      ...this.toObj(pedido.toObject()),
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado ? 'Si' : 'No',
    }))
  }

  async updateEnviarPedido(id, enviado) {
    const pedido = await this.model.findById(id)

    pedido.enviado = enviado

    await pedido.save()
  }
}

module.exports = new Pedido()
