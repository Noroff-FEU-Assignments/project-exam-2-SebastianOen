import React from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "react-bootstrap/esm/Button";

const apiUrl = "https://api.noroff.dev/api/v1/social/posts/";

const deletePost = async (postId) => {
  const accName = localStorage.getItem("AccName");
  const accessToken = localStorage.getItem("token");

  const response = await fetch(apiUrl + postId, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

const DeleteButton = ({ postId, postAuthor }) => {
  const queryClient = useQueryClient();

  const deletePostEvent = useMutation(() => deletePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const handleDelete = () => {
    const accName = localStorage.getItem("AccName");
    if (postAuthor === accName) {
      deletePostEvent.mutate();
    } else {
      return;
    }
  };

  return (
    <Button onClick={handleDelete} disabled={deletePostEvent.isLoading}>
      Delete
    </Button>
  );
};

export default DeleteButton;
