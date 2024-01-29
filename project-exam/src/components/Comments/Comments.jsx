import React from "react";
import Col from "react-bootstrap/Col";
import styles from "./Comments.module.css";

const Comments = (props) => {
  const list = props.comments?.map((item) => (
    <p className={styles.comment}>{item.body}</p>
  ));

  return (
    <div>
      <Col className={styles.commentsContainer}>{list}</Col>
    </div>
  );
};

export default Comments;
