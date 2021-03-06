const Query = {
  // User
  users: (_, __, { db }) => db.users,
  user: (_, args, { db }) => db.users.find((user) => user.id === args.id),

  // Post
  posts: (_, __, { db }) => db.posts,
  post: (_, args, { db }) => db.posts.find((post) => post.id === args.id),

  // Comment
  comments: (_, __, { db }) => db.comments,
  comment: (_, args, { db }) =>
    db.comments.find((comment) => comment.id === args.id),
};

export default Query;
