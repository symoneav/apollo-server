const { ApolloServer, gql } = require("apollo-server");
const { deburr } = require("lodash");
const models = require('./models')
const path = require('path')
const express = require('express')

const app = express()

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


// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});