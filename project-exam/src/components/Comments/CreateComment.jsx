import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./CreateComment.module.css";

const CommentBody = ({ postId }) => {
  const [postComment, setPostComment] = useState({
    body: "",
  });

  const queryClient = useQueryClient();

  const apiUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}/comment`;

  const commentEvent = useMutation(
    async () => {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(postComment),
      });

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", postId]);
        queryClient.invalidateQueries("posts");

        setPostComment({
          body: "",
        });
      },
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostComment({
      ...postComment,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    commentEvent.mutate();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Form.Control
            className={styles.commentText}
            as="textarea"
            rows={3}
            placeholder="Comment..."
            id="body"
            name="body"
            value={postComment.body}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.commentButtonContainer}>
          <Button
            className={styles.commentButton}
            type="submit"
            disabled={commentEvent.isLoading}
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentBody;
