import { Divider, Button, Comment, List } from "antd";
import styles from "../components/styles.module.css";
import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";

const GET_COMMENTS = gql`
  query getComments($id: ID!) {
    post(id: $id) {
      comments {
        id
        text
        user {
          fullName
          profile_photo
        }
      }
    }
  }
`;

export default function Comments({ post_id }) {
  const [btnIsVisible, setBtnIsVisible] = useState(true);
  const [loadComments, { loading, data }] = useLazyQuery(GET_COMMENTS, {
    variables: { id: post_id },
  });

  if (loading) return <p>Loading ...</p>;

  const getComments = () => {
    loadComments();
    setBtnIsVisible(!btnIsVisible);
  };
  return (
    <>
      <Divider>Comments</Divider>
      {btnIsVisible ? (
        <div className={styles.showCommentsBtnContainer}>
          <Button onClick={getComments}>Show Comments</Button>
        </div>
      ) : (
        <div className={styles.showCommentsBtnContainer}>
          <Button onClick={getComments}>Hide Comments</Button>
        </div>
      )}
      {!loading && data && !btnIsVisible && (
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={data.post.comments}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.user.fullName}
                avatar={item.user.profile_photo}
                content={item.text}
              />
            </li>
          )}
        />
      )}
    </>
  );
}
