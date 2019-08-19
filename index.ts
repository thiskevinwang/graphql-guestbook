const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./src/generated/prisma-client");
const Query = require("./src/resolvers/Query");
const Mutation = require("./src/resolvers/Mutation");
const Subscription = require("./src/resolvers/Subscription");
const User = require("./src/resolvers/User");
const Link = require("./src/resolvers/Link");
const Vote = require("./src/resolvers/Vote");
const { typeDefs } = require("./src/schema.graphql");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => ({
    ...request,
    prisma
  })
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
