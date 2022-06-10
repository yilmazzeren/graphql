const Comment = {
  user: (parent, _, { db }) => {
    return db.users.find((user) => user.id === parent.user_id);
  },
  posts: (parent, _, { db }) => {
    let filteredData = db.posts.find((post) => post.id === parent.post_id);
    return filteredData;
  },
};

export default Comment;
