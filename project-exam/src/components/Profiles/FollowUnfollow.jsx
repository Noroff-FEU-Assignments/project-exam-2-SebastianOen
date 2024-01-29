import Button from "react-bootstrap/Button";
import { useMutation, useQueryClient } from "react-query";
import { apiUrl } from "../../Constants/ApiUrl";

const FollowUnfollow = (props) => {
  const queryClient = useQueryClient();

  const handleFollow = useMutation(
    async () => {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(
        `${apiUrl}profiles/${props.name}/${props.follow}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: "{}",
        }
      );
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profile");
      },
    }
  );

  return (
    <div>
      <Button onClick={() => handleFollow.mutate()}>
        {props.follow === "unfollow" ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default FollowUnfollow;
