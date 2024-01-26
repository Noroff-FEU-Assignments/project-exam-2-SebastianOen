import Button from "react-bootstrap/Button";

const apiUrl = "https://api.noroff.dev/api/v1/social/posts/";

const Reactions = (props) => {
  const handleReaction = async () => {
    const accessToken = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}${props.id}/react/👍`, {
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
      <Button onClick={() => handleReaction()}>Like</Button>
    </div>
  );
};

export default Reactions;
