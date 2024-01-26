import React from "react";
import { useQuery } from "react-query";
import Image from "react-bootstrap/Image";
import styles from "./SingleProfile.module.css";
import Header from "../Layout/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const fetchProfile = async () => {
  const accessToken = localStorage.getItem("token");
  const apiUrl = "https://api.noroff.dev/api/v1/social/profiles";

  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const profileName = params.get("id");

  const queryParams = new URLSearchParams({
    _following: true,
    _followers: true,
    _posts: true,
  });

  const urlWithParams = `${apiUrl}/${profileName}?${queryParams.toString()}`;

  const response = await fetch(urlWithParams, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  return responseData;
};

const SingleProfile = () => {
  const { data, isLoading } = useQuery("profile", fetchProfile);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/home`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />{" "}
      <Row>
        <Col>
          <Button onClick={() => handleNavigate()}>Home</Button>
        </Col>
      </Row>
      <div className={styles.bannerContainer}>
        <Image
          fluid
          role="img"
          aria-label="missing description"
          style={{
            backgroundImage: `url(${data?.banner})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: 350,
            width: 600,
          }}
        ></Image>
      </div>
      <div className={styles.avatarContainer}>
        <Image
          src={data?.avatar}
          className={styles.profileAvatar}
          roundedCircle
        />
        <h1>{data.name}</h1>
      </div>
    </div>
  );
};

export default SingleProfile;
