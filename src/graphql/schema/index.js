const { buildSchema } = require('graphql')

const schema = `
  type Product {
    id: String!
    name: String
    price: Int
    platform: String
  }
  input ProductInput {
    name: String!
    price: String
    platform: String
  }
  type Query {
    getAllProducts(sort: String): [Product]
  }
  type Mutation {
    createProduct(data: ProductInput): Product
  }
`

module.exports = buildSchema(schema)