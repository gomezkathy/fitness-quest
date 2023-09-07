import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

function UpdateComment() {
  const { comment_id } = useParams();
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [currentComment, setCurrentComment] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const fetchAccount = async () => {
    try {
      const response = await fetch("http://localhost:8000/token", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        const userId = data.account;
        setAccessToken(accessToken);
        setUserId(userId);
      } else {
        console.error(
          "Failed to fetch token:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while fetching token:", error);
    }
  };

  const fetchCommentData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/comments/${comment_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const commentData = await response.json();
        setCurrentComment(commentData.comment);
      } else {
        console.error(
          "Failed to fetch comment data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while fetching comment data:", error);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    if (accessToken && comment_id) {
      fetchCommentData();
    }
  }, [accessToken, comment_id, fetchCommentData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const commentUrl = `http://localhost:8000/api/comments/${comment_id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify({
        comment: comment,
        user_id: userId,
        assigned_date: format(new Date(), "yyyy-MM-dd"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    };

    try {
      const response = await fetch(commentUrl, fetchConfig);

      if (response.ok) {
        setComment("");
      } else {
        console.error(
          "Failed to update comment:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while updating comment:", error);
    }
  };

  const handleCommentChange = (event) => {
    const value = event.target.value;
    setComment(value);
  };

  return (
    <div>
      <h1>Update Comment</h1>
      <form onSubmit={handleSubmit} id="update-comment">
        <div>
          <input
            onChange={handleCommentChange}
            value={comment}
            placeholder={currentComment}
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

export default UpdateComment;
