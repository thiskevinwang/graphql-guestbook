const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    },
    updateLink: (parent, args) => {
      const link = links[args.id];
      link.description = args.description;
      link.url = args.url;
      link.id = link.id;
      links[args.id] = link;
      return link;
    },
    deleteLink: (parent, args) => {
      const link = links[args.id];
      links.pop(link);
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
