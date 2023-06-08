const LocalStrategy = require('passport-local').Strategy
const userModel = require('../models/user.model')
const cartModel = require('../models/cart.model')

const mailSender = require('../notifications/mail')

module.exports = (passport) => {
  const authenticateUser = async (email, password, done) => {
    try {
      if (!(await userModel.existsByEmail(email))) {
        return done(null, false, { message: 'user does not exist!' })
      }

      if (!(await userModel.isPasswordValid(email, password))) {
        return done(null, false, { message: 'incorrect password!' })
      }

      const user = await userModel.getByEmail(email)
      const cart = await cartModel.getByUser(user.id)

      return done(null, { ...user, cartId: cart.id })
    } catch (err) {
      return done(err)
    }
  }

  const registerUser = async (req, email, password, done) => {
    const { fname, lname } = req.body
    try {
      if (await userModel.existsByEmail(email)) {
        return done(null, false, { message: 'user already exists!' })
      }

      const user = await userModel.save({
        email,
        firstname: fname,
        lastname: lname,
        password: password,
      })

      const cart = await cartModel.save({ userId: user.id.toString() })

      // console.log(user, cart)

      // enviar email de nuevo registro
      // mailSender.newUserMail(user)

      return done(null, { ...user, cartId: cart.id })
    } catch (err) {
      return done(err)
    }
  }

  // passport.use(new LocalStrategy(options, verifyFunction)
  // registrar estrategias
  passport.use(
    'local',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'pwd' },
      authenticateUser
    )
  )
  passport.use(
    'register',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'pwd', passReqToCallback: true },
      registerUser
    )
  )

  // serializar usuario
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) =>
    {
      const user = await userModel.getById(id)
      // console.log('deserializar user')
      done(null, user)
    }
    
  )
}
