import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Typography, Image } from "antd";
import Comments from "./Comments";

const { Title } = Typography;
const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      title
      id
      description
      cover
    }
  }
`;

export default function Post() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      id,
    },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const { post } = data;
  return (
    <div>
      <Title level={3}>{post.title}</Title>
      <Image width={400} src={post.cover} />
      <div>{post.description}</div>
      <Comments post_id={id} />
    </div>
  );
}
