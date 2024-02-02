import React from "react";
import { useQuery } from "react-query";
import styles from "./ProfileList.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../Constants/ApiUrl";

const fetchProfiles = async () => {
  const accessToken = localStorage.getItem("token");

  const queryParams = new URLSearchParams({});

  const urlWithParams = `${apiUrl}profiles/?${queryParams.toString()}`;

  const response = await fetch(urlWithParams, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

const ProfileList = () => {
  const { data, isLoading, isError } = useQuery("profiles", fetchProfiles);

  const navigate = useNavigate();

  const handleNavigate = (props) => {
    navigate(`/profile?id=${props}`);
  };

  if (isLoading) {
    return <Spinner animation="grow" />;
  }

  if (isError) {
    return <p>We cant seem to fetch the data</p>;
  }

  const blandPic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const profileRows = data?.map((result, index) => (
    <div>
      <Container
        className={styles.indProfiles}
        key={index}
        onClick={() => handleNavigate(result.name)}
      >
        <Row>
          <Col className={styles.author}>
            <Image
              src={result?.avatar || blandPic}
              className={styles.avatarImg}
              roundedCircle
            />
            <p>{result.name}</p>
          </Col>
        </Row>
      </Container>
    </div>
  ));

  return <div>{profileRows}</div>;
};

export default ProfileList;
