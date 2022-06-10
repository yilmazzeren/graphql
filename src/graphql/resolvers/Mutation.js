import { nanoid } from "nanoid";

const Mutation = {
  //User
  createUser: (_, { data }, { pubsub, db }) => {
    const user = { id: nanoid(), ...data };
    db.users.push(user);

    pubsub.publish("userCreated", { userCreated: user });
    return user;
  },

  updateUser: (_, { id, data }, { pubsub, db }) => {
    const user_index = db.users.findIndex((user) => user.id === id);

    if (user_index === -1) {
      throw new Error("User not found");
    }
    db.users[user_index] = {
      ...db.users[user_index],
      ...data,
    };

    pubsub.publish("userUpdated", { userUpdated: db.users[user_index] });
    return db.users[user_index];
  },

  deleteUser: (_, { id }, { pubsub, db }) => {
    const user_index = db.users.findIndex((user) => user.id === id);
    if (user_index === -1) {
      throw new Error("User not found");
    }
    const deleted_user = db.users[user_index];
    db.users.splice(user_index, 1);

    pubsub.publish("userDeleted", { userDeleted: deleted_user });
    return deleted_user;
  },

  deleteAllUsers: (_, __, { db }) => {
    const length = db.users.length;
    db.users.splice(0, length);

    return {
      count: length,
    };
  },

  //Post
  createPost: (_, { data }, { pubsub, db }) => {
    const post = { id: nanoid(), ...data };
    db.posts.push(post);

    pubsub.publish("postCreated", { postCreated: post });
    return post;
  },

  updatePost: (_, { id, data }, { pubsub, db }) => {
    const post_index = db.posts.findIndex((post) => post.id === id);
    if (post_index === -1) {
      throw new Error("Post not found");
    }
    db.posts[post_index] = {
      ...db.posts[post_index],
      ...data,
    };

    pubsub.publish("postUpdated", { postUpdated: db.posts[post_index] });
    return db.posts[post_index];
  },

  deletePost: (_, { id }, { pubsub, db }) => {
    const post_index = db.posts.findIndex((post) => post.id === id);
    const deleted_post = db.posts.find((post) => post.id === id);
    if (post_index === -1) {
      throw new Error("Post not found");
    }
    db.posts.splice(post_index, 1);

    pubsub.publish("postDeleted", { postDeleted: deleted_post });
    return deleted_post;
  },

  deleteAllPosts: (_, __, { db }) => {
    const length = db.posts.length;
    db.posts.splice(0, length);
    return {
      count: length,
    };
  },

  //Comment
  createComment: (_, { data }, { pubsub, db }) => {
    const comment = {
      id: nanoid(),
      ...data,
    };
    db.comments.push(comment);

    pubsub.publish("commentCreated", { commentCreated: comment });
    return comment;
  },

  updateComment: (_, { id, data }, { pubsub, db }) => {
    const comment_index = db.comments.findIndex((comment) => comment.id === id);
    if (comment_index === -1) {
      throw new Error("Comment not found");
    }
    db.comments[comment_index] = {
      ...db.comments[comment_index],
      ...data,
    };
    pubsub.publish("commentUpdated", {
      commentUpdated: db.comments[comment_index],
    });
    return db.comments[comment_index];
  },

  deleteComment: (_, { id }, { pubsub, db }) => {
    const comment_index = db.comments.findIndex((comment) => comment.id === id);
    const deleted_comment = db.comments.find((comment) => comment.id === id);

    if (comment_index === -1) {
      throw new Error("Comment not found");
    }

    db.comments.splice(comment_index, 1);
    pubsub.publish("commentDeleted", { commentDeleted: deleted_comment });
    return deleted_comment;
  },

  deleteAllComments: (_, __, { db }) => {
    const length = db.comments.length;
    db.comments.splice(0, length);

    return {
      count: length,
    };
  },
};

export default Mutation;
