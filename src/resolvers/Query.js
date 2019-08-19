const { APP_SECRET, getUserId } = require("../utils");

async function feed(parent, args, context) {
  const count = await context.prisma
    .linksConnection({
      where: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter },
        ],
      },
    })
    .aggregate()
    .count()
  const links = await context.prisma.links({
    where: {
      OR: [
        { description_contains: args.filter },
        { url_contains: args.filter },
      ],
    },
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  })
  return {
    count,
    links,
  }
}

// getUser
async function getUser(parent, args, context) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    User: { id: userId }
  });
}

module.exports = {
  feed,
  getUser
}
