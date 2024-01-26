import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import Image from "react-bootstrap/Image";
import styles from "./SinglePost.module.css";
import Header from "../Layout/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import UpdateModal from "../components/UpdatePost";
import DeleteButton from "../components/DeleteButton";
import CommentBody from "../components/CreateComment";
import Comments from "../components/Comments";

const fetchPost = async () => {
  const accessToken = localStorage.getItem("token");
  const apiUrl = "https://api.noroff.dev/api/v1/social/posts";

  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const postId = params.get("id");

  const queryParams = new URLSearchParams({
    _author: true,
    _comments: true,
    _reactions: true,
  });

  const urlWithParams = `${apiUrl}/${postId}?${queryParams.toString()}`;

  const response = await fetch(urlWithParams, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  return responseData;
};

const SinglePost = () => {
  const { data, isLoading } = useQuery("post", fetchPost);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/home`);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const accName = localStorage.getItem("AccName");
  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div>
      {" "}
      <Header />
      <Row>
        <Col>
          <Button onClick={() => handleNavigate()}>Home</Button>
        </Col>
      </Row>
      <Container className={styles.indPosts}>
        <Row>
          <Col className={styles.author}>
            <div className={styles.authorContainer}>
              <Image
                src={
                  data.author.avatar ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                className={styles.avatarImg}
                roundedCircle
              />
              <p className={styles.authorName}>{data.author.name}</p>
            </div>
            {data.author.name === accName && (
              <DropdownButton id="dropdown-basic-button" title="Options">
                <Dropdown.Item>
                  {data.author.name === accName && (
                    <Button onClick={openModal}>Update Post</Button>
                  )}
                </Dropdown.Item>
                {showModal && (
                  <UpdateModal onClose={closeModal} postId={data.id} />
                )}
                <Dropdown.Item>
                  {data.author.name === accName && (
                    <DeleteButton
                      postId={data.id}
                      postAuthor={data.author.name}
                    />
                  )}
                </Dropdown.Item>
              </DropdownButton>
            )}
          </Col>
        </Row>
        <Row>
          <Col className={styles.bodyTextTitle}>{data.title}</Col>
        </Row>
        <Row>
          <Col className={styles.bodyText}>{data.body}</Col>
        </Row>
        <Row>
          <Col className={styles.postMediaContainer}>
            <Image src={data.media} className={styles.postMedia} fluid />
          </Col>
        </Row>
        <Row>
          <Col>
            <Comments comments={data.comments} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CommentBody postId={data.id} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SinglePost;
