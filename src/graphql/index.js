const { graphqlHTTP } = require("express-graphql")
const schema = require('./schema')
const products = require("./resolvers/products")

module.exports = (app) => {
  app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: products,
    graphiql: true
  }));
}