import React from "react";
import { Avatar, List } from "antd";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
const GET_POSTS = gql`
  query getAllPosts {
    posts {
      id
      title
      description
      user {
        profile_photo
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <List
      className="demo-loadmore-list"
      loading={false}
      itemLayout="horizontal"
      //loadMore={loadMore}
      dataSource={data.posts}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.user.profile_photo} />}
            title={<Link to={`post/${item.id}`}>{item.title}</Link>}
            description={
              <Link style={{ color: "gray" }} to={`post/${item.id}`}>
                {item.description}
              </Link>
            }
          />
        </List.Item>
      )}
    />
  );
}
