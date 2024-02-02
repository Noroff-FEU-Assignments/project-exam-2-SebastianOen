import Button from "react-bootstrap/Button";
import { apiUrl } from "../../Constants/ApiUrl";
import { useMutation, useQueryClient } from "react-query";

const Reactions = (props) => {
  const queryClient = useQueryClient();

  const reactionEvent = useMutation(
    async () => {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}posts/${props.id}/react/👍`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: "{}",
      });

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  return (
    <div>
      <Button onClick={() => reactionEvent.mutate()}>Like</Button>
    </div>
  );
};

export default Reactions;
