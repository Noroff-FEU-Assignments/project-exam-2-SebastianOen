import React from "react";
import { useQuery } from "react-query";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import styles from "./allposts.module.css";
import Comments from "./Comments";
import Spinner from "react-bootstrap/Spinner";
import DeleteButton from "./DeleteButton";
import CommentBody from "./CreateComment";
import UpdateModal from "./UpdatePost";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Reactions from "./Reactions";

const apiUrl = "https://api.noroff.dev/api/v1/social/posts";

const fetchPosts = async () => {
  const accessToken = localStorage.getItem("token");

  const queryParams = new URLSearchParams({
    _author: true,
    _comments: true,
    _reactions: true,
  });

  const urlWithParams = `${apiUrl}?${queryParams.toString()}`;

  const response = await fetch(urlWithParams, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

const Posts = () => {
  const { data, isLoading } = useQuery("posts", fetchPosts);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (isLoading) {
    return <Spinner animation="grow" />;
  }

  const handleNavigate = (props) => {
    navigate(`/post?id=${props}`);
  };

  const accName = localStorage.getItem("AccName");

  console.log(data);

  const rows = data?.map((result, index) => (
    <Container className={styles.indPosts} key={index}>
      <Row>
        <Col className={styles.author}>
          <div className={styles.authorContainer}>
            <Image
              src={
                result.author.avatar ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              className={styles.avatarImg}
              roundedCircle
            />
            <p className={styles.authorName}>{result.author.name}</p>
          </div>
          {result.author.name === accName && (
            <DropdownButton id="dropdown-basic-button" title="Options">
              <Dropdown.Item>
                {result.author.name === accName && (
                  <Button onClick={openModal}>Update Post</Button>
                )}
              </Dropdown.Item>
              {showModal && (
                <UpdateModal onClose={closeModal} postId={result.id} />
              )}
              <Dropdown.Item>
                {result.author.name === accName && (
                  <DeleteButton
                    postId={result.id}
                    postAuthor={result.author.name}
                  />
                )}
              </Dropdown.Item>
            </DropdownButton>
          )}
        </Col>
      </Row>
      <Row>
        <Col className={styles.bodyTextTitle}>{result.title}</Col>
      </Row>
      <Row>
        <Col className={styles.bodyText}>{result.body}</Col>
      </Row>
      <Row>
        <Col className={styles.postMediaContainer}>
          <Image src={result.media} className={styles.postMedia} fluid />
        </Col>
      </Row>
      <Row>
        <Col className={styles.postMediaContainer}>
          <Reactions id={result.id} />
          <p> 👍 </p> <p>{result._count.reactions}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Comments comments={result.comments} />
        </Col>
      </Row>
      <Row>
        <Col>
          <CommentBody postId={result.id} />
          <Button onClick={() => handleNavigate(result.id)}>View Post</Button>
        </Col>
      </Row>
    </Container>
  ));

  return <div>{rows}</div>;
};

export default Posts;
