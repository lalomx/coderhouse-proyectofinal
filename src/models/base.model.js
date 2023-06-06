const { model, Types } = require('mongoose')
const _ = require('lodash')

class BaseModel {
  constructor(schema, modelName, skipFields) {
    this.model = model(modelName, schema)
    this.skipFields = skipFields || ['password']
  }

  // READ
  async getAll(sort) {
    const projection = this.skipFields.reduce(
      (proj, field) => ({
        ...proj,
        [field]: 0,
      }),
      {}
    )

    // { name: 1 }
    const data = await this.model.find({}, projection).sort({ [sort || "id"]: 1 })
    return data.map(item => this.toObj(item.toObject()))
  }

  async getById(id) {
    const item = await this.model.findById(Types.ObjectId(id))
    if (!item) {
      return null
    }
    return this.toObj(item.toObject())
  }

  async count() {
    return this.model.countDocuments({})
  }

  // DELETE
  delete(id) {
    return this.model.deleteOne({ _id: Types.ObjectId(id) })
  }

  async save(item) {
    const databaseData = await this.model.create(item)
    return this.toObj(databaseData.toObject())
  }

  toObj(item) {
    const omit = this.skipFields.concat(['_id', '__v'])
    return _.omit({ ...item, id: item._id }, omit)
  }
}

module.exports = BaseModel
