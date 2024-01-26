import Button from "react-bootstrap/Button";

const apiUrl = "https://api.noroff.dev/api/v1/social/profiles/";

const FollowUnfollow = (props) => {
  const handleFollow = async () => {
    const accessToken = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}${props.name}/${props.follow}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: "{}",
    });

    return response.json();
  };

  return (
    <div>
      <Button onClick={() => handleFollow()}>
        {props.follow === "unfollow" ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default FollowUnfollow;
