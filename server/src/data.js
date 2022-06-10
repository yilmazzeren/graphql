const users = [
  {
    id: "1",
    fullName: "Ali",
    age: 29,
  },
  {
    id: "2",
    fullName: "Veli",
    age: 30,
  },
];

const posts = [
  {
    id: "1",
    title: "Ali'nin gönderisi",
    user_id: "1",
  },
  {
    id: "2",
    title: "Veli'nin gönderisi",
    user_id: "1",
  },
  {
    id: "3",
    title: "Ali'nin diğer gönderisi",
    user_id: "2",
  },
];

const comments = [
  {
    id: "1",
    text: "Lorem ipsum",
    post_id: "1",
    user_id: "2",
  },
  {
    id: "2",
    text: "Lorem ipsum doler",
    post_id: "1",
    user_id: "1",
  },
  {
    id: "3",
    text: "Foo bar",
    post_id: "2",
    user_id: "2",
  },
  {
    id: "4",
    text: "Foo bar baz",
    post_id: "3",
    user_id: "1",
  },
];

export default {
  users,
  posts,
  comments,
};
