const swaggerUi = require('swagger-ui-express')
const doc = require('../doc/swagger.json')

module.exports = function(app) {  
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(doc))
}