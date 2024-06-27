const typeDefs = `


  type User {
    _id: ID!
    username: String!
    city: String
    sign: String
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
  }

  type Mutation {
    createUser(username: String!, password: String!, city: String, sign: String): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
