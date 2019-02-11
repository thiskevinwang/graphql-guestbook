const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`;

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
};

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
