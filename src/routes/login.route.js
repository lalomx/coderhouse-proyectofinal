const { Router } = require('express')
const passport = require('passport')

// const { generateToken } = require('../auth')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.get('/login', (req, res) => res.render('login'))
router.get('/register', (req, res) => res.render('register'))

router.post(
  '/register',
  passport.authenticate('register', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true,
  })
)

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true,
  }),
  // (req, res) => {
  //   console.log(req.user)

  //   // const token = generateToken(req.user)
  //   res.clearCookie('cartId')
  //   res.cookie('cartId', req.user.cartId)

  //   res.status(200).send(token)
  // }
)
router.get('/logout', auth, (req, res) => {
  const { firstname, lastname } = req.user

  req.logOut((err) => console.log('loggedout'))
  res.render('logout', { name: `${firstname} ${lastname}` }) // despues de aqui el backend no puede hacer mas nada
})

router.get('/profile', auth, (req, res) => {
  res.render('profile')
})

router.post('/profile', auth, (req, res) => {
  /// para subir la imagen

  res.redirect('/')
})

module.exports = router
