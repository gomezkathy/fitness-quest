import React, { useState, useEffect } from "react";
import { format } from "date-fns";

function CreateComment() {
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const fetchAccount = async () => {
    const response = await fetch("http://localhost:8000/token", {
      credentials: "include",
    });
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      const userId = data.account;
      setUserId(userId);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const commentUrl = "http://localhost:8000/api/comments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify({
        comment,
        user_id: userId,
        assigned_date: format(new Date(), "yyyy-MM-dd"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    await fetch(commentUrl, fetchConfig);
    setComment("");
  };

  const handleCommentChange = (event) => {
    const value = event.target.value;
    setComment(value);
  };

  return (
    <div>
      <h1>Create a Comment</h1>
      <form onSubmit={handleSubmit} id="create-comment">
        <div>
          <input
            onChange={handleCommentChange}
            value={comment}
            placeholder="Leave a comment..."
            required
            type="text"
            name="comment"
            id="comment"
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateComment;
