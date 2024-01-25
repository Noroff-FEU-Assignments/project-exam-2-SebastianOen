import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const UpdateModal = ({ postId, title, body, tags, media, onClose }) => {
  const [updatedData, setUpdatedData] = useState({
    title: title || "",
    body: body || "",
    tags: tags ? tags.join(", ") : "",
    media: media || "",
  });

  const queryClient = useQueryClient();

  const updatePost = useMutation(
    async () => {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/social/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: updatedData.title,
            body: updatedData.body,
            tags: updatedData.tags.split(", ").map((tag) => tag.trim()),
            media: updatedData.media,
          }),
        }
      );

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        onClose();
      },
    }
  );

  const handleUpdate = () => {
    updatePost.mutate();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={updatedData.title}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="body"
              value={updatedData.body}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, body: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="tags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              name="tags"
              value={updatedData.tags}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, tags: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="media">
            <Form.Label>Media URL</Form.Label>
            <Form.Control
              type="text"
              name="media"
              value={updatedData.media}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, media: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleUpdate}
          disabled={updatePost.isLoading}
        >
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
