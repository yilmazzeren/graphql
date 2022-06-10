const User = {
  posts: (parent, _, { db }) =>
    db.posts.filter((post) => post.user_id === parent.id),
  comments: (parent, _, { db }) => {
    return db.comments.filter((comment) => comment.user_id === parent.id);
  },
};

export default User;
