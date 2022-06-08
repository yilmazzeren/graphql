const { users, posts, comments } = require("./data");
const { nanoid } = require("nanoid");

const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const gql = require("graphql-tag");
const express = require("express");
const http = require("http");
const { PubSub } = require("graphql-subscriptions");

const typeDefs = gql`
  #User
  type User {
    id: ID!
    fullName: String!
    age: Int!
    posts: [Post]
    comments: [Comment]
  }

  input CreateUserInput {
    fullName: String!
    age: Int!
  }

  input UpdateUserInput {
    fullName: String
    age: Int
  }

  #Post
  type Post {
    id: ID!
    title: String!
    user_id: ID!
    user: User
    comments: [Comment]
  }

  input CreatePostInput {
    title: String!
    user_id: ID!
  }

  input UpdatePostInput {
    title: String
    user_id: ID
  }

  #Comment
  type Comment {
    id: ID!
    text: String!
    post_id: ID!
    user_id: ID!
    user: User
    posts: Post
  }

  input CreateCommentInput {
    text: String!
    user_id: ID!
    post_id: ID!
  }

  input UpdateCommentInput {
    text: String
    user_id: ID
    post_id: ID
  }

  type DeleteAllOutput {
    count: Int!
  }
  type Query {
    # User
    users: [User!]!
    user(id: ID!): User

    # Post
    posts: [Post!]!
    post(id: ID!): Post
    # Comment
    comments: [Comment!]!
    comment(id: ID!): Comment
  }

  type Mutation {
    #User
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: DeleteAllOutput!

    #Post
    createPost(data: CreatePostInput): Post!
    updatePost(id: ID!, data: UpdatePostInput): Post!
    deletePost(id: ID!): Post!
    deleteAllPosts: DeleteAllOutput!

    #Comment
    createComment(data: CreateCommentInput): Comment!
    updateComment(id: ID!, data: UpdateCommentInput): Comment!
    deleteComment(id: ID!): Comment!
    deleteAllComments: DeleteAllOutput!
  }

  type Subscription {
    #User
    userCreated: User!
    userUpdated: User!
    userDeleted: User!

    #Post
    postCreated: Post!
    postUpdated: Post!
    postDeleted: Post!

    #Comment
    commentCreated: Comment!
    commentUpdated: Comment!
    commentDeleted: Comment!
  }
`;

const resolvers = {
  Subscription: {
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
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("postCreated"),
    },
    postUpdated: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("postUpdated"),
    },
    postDeleted: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("postDeleted"),
    },

    // Comment

    commentCreated: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("commentCreated"),
    },
    commentUpdated: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("commentUpdated"),
    },
    commentDeleted: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("commentDeleted"),
    },
  },
  Mutation: {
    //User
    createUser: (_, { data }, { pubsub }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);

      pubsub.publish("userCreated", { userCreated: user });
      return user;
    },

    updateUser: (_, { id, data }, { pubsub }) => {
      const user_index = users.findIndex((user) => user.id === id);

      if (user_index === -1) {
        throw new Error("User not found");
      }
      users[user_index] = {
        ...users[user_index],
        ...data,
      };

      pubsub.publish("userUpdated", { userUpdated: users[user_index] });
      return users[user_index];
    },

    deleteUser: (_, { id }, { pubsub }) => {
      const user_index = users.findIndex((user) => user.id === id);
      if (user_index === -1) {
        throw new Error("User not found");
      }
      const deleted_user = users[user_index];
      users.splice(user_index, 1);

      pubsub.publish("userDeleted", { userDeleted: deleted_user });
      return deleted_user;
    },

    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0, length);

      return {
        count: length,
      };
    },

    //Post
    createPost: (_, { data }, { pubsub }) => {
      const post = { id: nanoid(), ...data };
      posts.push(post);

      pubsub.publish("postCreated", { postCreated: post });
      return post;
    },

    updatePost: (_, { id, data }, { pubsub }) => {
      const post_index = posts.findIndex((post) => post.id === id);
      if (post_index === -1) {
        throw new Error("Post not found");
      }
      posts[post_index] = {
        ...posts[post_index],
        ...data,
      };

      pubsub.publish("postUpdated", { postUpdated: posts[post_index] });
      return posts[post_index];
    },

    deletePost: (_, { id }, { pubsub }) => {
      const post_index = posts.findIndex((post) => post.id === id);
      const deleted_post = posts.find((post) => post.id === id);
      if (post_index === -1) {
        throw new Error("Post not found");
      }
      posts.splice(post_index, 1);

      pubsub.publish("postDeleted", { postDeleted: deleted_post });
      return deleted_post;
    },

    deleteAllPosts: () => {
      const length = posts.length;
      posts.splice(0, length);
      return {
        count: length,
      };
    },

    //Comment
    createComment: (_, { data }, { pubsub }) => {
      const comment = {
        id: nanoid(),
        ...data,
      };
      comments.push(comment);

      pubsub.publish("commentCreated", { commentCreated: comment });
      return comment;
    },

    updateComment: (_, { id, data }, { pubsub }) => {
      const comment_index = comments.findIndex((comment) => comment.id === id);
      if (comment_index === -1) {
        throw new Error("Comment not found");
      }
      comments[comment_index] = {
        ...comments[comment_index],
        ...data,
      };
      pubsub.publish("commentUpdated", {
        commentUpdated: comments[comment_index],
      });
      return comments[comment_index];
    },

    deleteComment: (_, { id }, { pubsub }) => {
      const comment_index = comments.findIndex((comment) => comment.id === id);
      const deleted_comment = comments.find((comment) => comment.id === id);

      if (comment_index === -1) {
        throw new Error("Comment not found");
      }

      comments.splice(comment_index, 1);
      pubsub.publish("commentDeleted", { commentDeleted: deleted_comment });
      return deleted_comment;
    },

    deleteAllComments: () => {
      const length = comments.length;
      comments.splice(0, length);

      return {
        count: length,
      };
    },
  },
  Query: {
    // User
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),

    // Post
    posts: () => posts,
    post: (parent, args) => posts.find((post) => post.id === args.id),

    // Comment
    comments: () => comments,
    comment: (args) => comments.find((comment) => comment.id === args.id),
  },

  User: {
    posts: (parent) => posts.filter((post) => post.user_id === parent.id),
    comments: (parent) => {
      return comments.filter((comment) => comment.user_id === parent.id);
    },
  },

  Post: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
    comments: (parent) => {
      return comments.filter((comment) => comment.post_id === parent.id);
    },
  },

  Comment: {
    user: (parent) => {
      return users.find((user) => user.id === parent.user_id);
    },
    posts: (parent) => {
      let filteredData = posts.find((post) => post.id === parent.post_id);
      return filteredData;
    },
  },
};

(async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const pubsub = new PubSub();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, pubsub }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  const subscriptionServer = SubscriptionServer.create(
    {
      // This is the `schema` we just created.
      schema,
      // These are imported from `graphql`.
      execute,
      subscribe,
      // Providing `onConnect` is the `SubscriptionServer` equivalent to the
      // `context` function in `ApolloServer`. Please [see the docs](https://github.com/apollographql/subscriptions-transport-ws#constructoroptions-socketoptions--socketserver)
      // for more information on this hook.
      async onConnect(connectionParams, webSocket, context) {
        console.log("Connected!");
        // If an object is returned here, it will be passed as the `context`
        // argument to your subscription resolvers.
        return {
          pubsub,
        };
      },
      onDisconnect(webSocket, context) {
        console.log("Disconnected!");
      },
    },
    {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // This `server` is the instance returned from `new ApolloServer`.
      path: server.graphqlPath,
    }
  );

  await server.start();
  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})(typeDefs, resolvers);
