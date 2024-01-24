import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import styles from "./MyProfile.module.css";
import Spinner from "react-bootstrap/Spinner";

const apiUrl = "https://api.noroff.dev/api/v1/social/profiles/";

const fetchProfile = async (accName) => {
  const accessToken = localStorage.getItem("token");

  const response = await fetch(apiUrl + accName, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

const updateProfile = async ({ accName, avatar, banner }) => {
  const accessToken = localStorage.getItem("token");

  const response = await fetch(apiUrl + accName + "/media", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar, banner }),
  });

  return response.json();
};

const Profile = () => {
  const accName = localStorage.getItem("AccName");
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(["profile", accName], () =>
    fetchProfile(accName)
  );

  const [editMode, setEditMode] = useState(false);
  const [newAvatarPic, setNewAvatarPic] = useState("");
  const [newBannerPic, setNewBannerPic] = useState("");

  const updateProfilePictures = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", accName]);
      setEditMode(false);
    },
  });

  useEffect(() => {
    if (data) setNewAvatarPic(data?.avatar);
    setNewBannerPic(data?.banner);
  }, [data]);

  const handleUpdate = () => {
    updateProfilePictures.mutate({
      accName,
      avatar: newAvatarPic,
      banner: newBannerPic,
    });
  };

  const handleCancel = () => {
    setEditMode(false);
    setNewAvatarPic(data?.avatar);
    setNewBannerPic(data?.banner);
  };

  if (isLoading) {
    return <Spinner animation="grow" />;
  }

  if (isError) {
    return <p>We cant can not fetch your profile</p>;
  }

  return (
    <div>
      <div className={styles.bannerContainer}>
        <Image
          fluid
          role="img"
          aria-label="missing description"
          style={{
            backgroundImage: `url(${data.banner})`,
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

      {editMode ? (
        <div>
          <label htmlFor="avatar">Avatar:</label>
          <Form.Control
            className="mb-3"
            type="text"
            id="avatar"
            name="avatar"
            value={newAvatarPic}
            onChange={(e) => setNewAvatarPic(e.target.value)}
          />
          <label htmlFor="banner">Banner:</label>
          <Form.Control
            placeholder="Update your banner URL here"
            className="mb-3"
            type="text"
            id="banner"
            name="banner"
            value={newBannerPic}
            onChange={(e) => setNewBannerPic(e.target.value)}
          />
          <div className={styles.editOptions}>
            <Button
              onClick={handleUpdate}
              disabled={updateProfilePictures.isLoading}
            >
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className={styles.editOptions}>
          <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
