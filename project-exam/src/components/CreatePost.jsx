import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./CreatePost.module.css";

const PostForm = () => {
  const [postData, setPostData] = useState({
    title: "",
    body: "",
    media: "",
  });

  const queryClient = useQueryClient();

  const postEvent = useMutation(
    async () => {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/social/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error("Sorry, something went wrong");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");

        setPostData({
          title: "",
          body: "",
          tags: [],
          media: "",
        });
      },
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postEvent.mutate();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div>
          <Form.Control
            className="mb-3"
            placeholder="Post your opinions!"
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="What's on your mind?"
            id="body"
            name="body"
            value={postData.body}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Form.Control
            placeholder="Insert your Image URL"
            className="mb-3"
            type="text"
            id="media"
            name="media"
            value={postData.media}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" disabled={postEvent.isLoading}>
          {postEvent.isLoading ? "Posting..." : "Post"}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
