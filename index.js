const { ApolloServer, gql } = require("apollo-server");
const { deburr } = require("lodash");
const models = require('./models')


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
type User {
    firstName: String!
    lastName:String!
    email: String!
  }
type Query {
    users:[User]
  }
type Mutation {
    createUser(firstName: String!,lastName: String!,email: String!): User!
  }
`;

const users = [{firstName:"Symone", lastName:"Varnado", email:"symonevarnado@gmai.com"}]

// Provide resolver functions for your schema fields
let db = models
console.log(db.User, "checking")
const resolvers = {
    
  Query: {
    async users(root, { email }, models ) {
        return db.User.findAll();
      },
  },
  Mutation: {
    async createUser(root, {firstName, lastName, email }, models) {
      const newUser = await  db.User.create({
        firstName,
        lastName,
        email
      });

      return newUser
    },
}
};



const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});