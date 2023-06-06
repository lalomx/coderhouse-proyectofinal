const { verifyToken } = require('../auth')

module.exports = (req, res, next) => {
  const header = req.headers.authorization

  if (!header) {
    console.log('no header')
    return res.status(401).send({
      error: 'unauthorized',
    })
  }

  // Authorization: Bearer <token>

  const token = header.split(' ')[1]

  console.log(token)

  if (!verifyToken(token)) {
    console.log('no valid token')
    return res.status(401).send({
      error: 'unauthorized',
    })
  }

  return next()
}
