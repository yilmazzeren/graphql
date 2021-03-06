import gql from "graphql-tag";
const typeDefs = gql`
  #User
  type User {
    id: ID!
    fullName: String!
    age: Int!
    profile_photo: String
    posts: [Post]
    comments: [Comment]
  }

  input CreateUserInput {
    fullName: String!
    profile_photo: String
    age: Int!
  }

  input UpdateUserInput {
    fullName: String
    profile_photo: String
    age: Int
  }

  #Post
  type Post {
    id: ID!
    title: String!
    description: String
    cover: String
    user_id: ID!
    user: User
    comments: [Comment]
  }

  input CreatePostInput {
    title: String!
    description: String
    user_id: ID!
    cover: String
  }

  input UpdatePostInput {
    title: String
    description: String
    user_id: ID
    cover: String
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
    postCreated(user_id: ID): Post!
    postUpdated: Post!
    postDeleted: Post!

    #Comment
    commentCreated(post_id: ID): Comment!
    commentUpdated: Comment!
    commentDeleted: Comment!
  }
`;

export default typeDefs;
