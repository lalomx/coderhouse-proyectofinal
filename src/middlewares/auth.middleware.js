module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    // console.log(req.session)
    return next()
  }

  return res.redirect('/login')
}
