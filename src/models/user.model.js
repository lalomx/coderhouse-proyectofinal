const { Schema } = require('mongoose')
const bcrypt = require('bcrypt')
const BaseModel = require('./base.model')

class User extends BaseModel {
  constructor() {
    const schema = new Schema({
      email: String,
      firstname: String,
      lastname: String,
      phone: String,
      password: String,
      // age
    })
    const skipFields = ['password']
    super(schema, 'user', skipFields)
  }

  async save(newUser) {
    const obj = newUser
    obj.password = await bcrypt.hash(newUser.password, 10)
    return super.save(obj)
  }

  existsByEmail(email) {
    return this.model.exists({ email })
  }

  async getByEmail(email) {
    const user = await this.model.findOne({ email })
    if (!user) {
      return null
    }
    return this.toObj(user.toObject())
  }

  async isPasswordValid(email, pwd) {
    const user = await this.model.findOne({ email })

    return bcrypt.compare(pwd, user.password)
  }
}

module.exports = new User()
