import React from 'react';
import { useQuery, useMutation, useQueryClient } from "react-query";

const apiUrl = "https://api.noroff.dev/api/v1/social/profiles/";

const UpdatePost = (postId) => {
    const accessToken = localStorage.getItem("token");

    const response = await fetch(apiUrl + "/posts" + postId, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({   
        title: updatedData.title,
        body: updatedData.body,
        tags: updatedData.tags.split(", ").map((tag) => tag.trim()),
        media: updatedData.media,}),
    });
  
    return response.json();
  };

    return (
        <div>
            
        </div>
    );
};

export default UpdatePost;