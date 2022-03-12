const { ApolloServer, gql } = require("apollo-server");
const path = require("path");
const express = require("express");
const { deburr } = require("lodash");
const models = require("./models");

const app = express();

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    firstName: String!
    lastName: String!
    email: String!
  }

  type Link {
    url: String!
    slug: String!
  }
  type Query {
    users: [User]
    links: [Link]
  }
  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!): User!
    createLink(url: String!, slug: String!): Link!
  }
`;

// Provide resolver functions for your schema fields
let db = models;

const resolvers = {
  Query: {
    async users(root, { email }) {
      return db.User.findAll();
    },
    async links(root, {}) {
      return db.Link.findAll();
    },
  },
  Mutation: {
    async createUser(root, { firstName, lastName, email }) {
      const newUser = await db.User.create({
        firstName,
        lastName,
        email,
      });

      return newUser;
    },
    async createLink(root, { url,slug }) {
      const newLink = await db.Link.create({
        url,
        slug,
      });

      return newLink;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
