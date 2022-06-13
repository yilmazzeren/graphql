import React from "react";
import { Avatar, List, Skeleton } from "antd";
export default function Home() {
  const data = [
    {
      gender: "male",
      name: {
        title: "Mr",
        first: "Leo",
        last: "Holmes",
      },
      email: "leo.holmes@example.com",
      picture: {
        large: "https://randomuser.me/api/portraits/men/39.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/39.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/39.jpg",
      },
      nat: "GB",
    },
    {
      gender: "male",
      name: {
        title: "Mr",
        first: "Leo",
        last: "Holmes",
      },
      email: "leo.holmes@example.com",
      picture: {
        large: "https://randomuser.me/api/portraits/men/39.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/39.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/39.jpg",
      },
      nat: "GB",
    },
  ];
  return (
    <List
      className="demo-loadmore-list"
      loading={false}
      itemLayout="horizontal"
      //loadMore={loadMore}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name?.last}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
}
