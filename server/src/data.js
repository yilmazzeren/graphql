const users = [
  {
    id: "1",
    fullName: "Ali",
    profile_photo: "https://randomuser.me/api/portraits/men/67.jpg",
    age: 29,
  },
  {
    id: "2",
    fullName: "Veli",
    profile_photo: "https://randomuser.me/api/portraits/women/17.jpg",
    age: 30,
  },
];

const posts = [
  {
    id: "1",
    title: "Ali'nin gönderisi",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elit tortor, facilisis sed sapien sed, ultrices pellentesque erat. Donec a efficitur leo. Donec tempus nibh sed nulla sagittis, nec ornare augue placerat. Vestibulum eu arcu vitae elit dignissim varius. Vestibulum rutrum metus quis iaculis aliquam. Donec tincidunt metus eu dignissim luctus. Suspendisse blandit auctor velit eu vestibulum.",
    user_id: "1",
    cover:
      "https://paulvanderlaken.files.wordpress.com/2020/02/post-box-11.jpg",
  },
  {
    id: "2",
    title: "Veli'nin gönderisi",
    description:
      "Dellentesque posuere gravida quam, eu malesuada ligula. Duis sagittis ipsum arcu.",
    user_id: "1",
    cover:
      "https://studiovisual.com.br/wp-content/uploads/2021/08/o_que_e_post_Prancheta-1.jpg",
  },
  {
    id: "3",
    title: "Ali'nin diğer gönderisi",
    description:
      "Nam ligula neque, condimentum ac pellentesque nec, blandit eget tortor.",
    user_id: "2",
    cover:
      "https://www.salesforce.com/content/dam/blogs/ca/Blog%20Posts/anatomy-of-a-blog-post-deconstructed-open-graph.jpg",
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
