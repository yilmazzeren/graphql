const { withFilter } = require("graphql-subscriptions");
const Subscription = {
  //User

  userCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userCreated"),
  },
  userDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userDeleted"),
  },
  userUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userUpdated"),
  },

  // Post

  postCreated: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator("postCreated"),
      (payload, variables) => {
        return variables.user_id
          ? payload.postCreated.user_id === variables.user_id
          : true;
      }
    ),
  },
  postUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("postUpdated"),
  },
  postDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("postDeleted"),
  },

  // Comment

  commentCreated: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator("commentCreated"),
      (payload, variables) => {
        return variables.post_id
          ? payload.commentCreated.post_id === variables.post_id
          : true;
      }
    ),
  },
  commentUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("commentUpdated"),
  },
  commentDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("commentDeleted"),
  },
};

module.exports = Subscription;
