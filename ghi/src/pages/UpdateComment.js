import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import useToken from "@galvanize-inc/jwtdown-for-react";

function UpdateComment({ onClose, commentId, exerciseId }) {
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [currentComment, setCurrentComment] = useState("");
  const { token } = useToken();
  const [successMessage, setSuccessMessage] = useState("");

  const fetchAccount = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const userId = data.account;
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
        `${process.env.REACT_APP_API_HOST}/api/comments/${exerciseId}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const callbackFetchCommentData = useCallback(fetchCommentData, [
    commentId,
    exerciseId,
    token,
  ]);

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    setComment(currentComment);
  }, [currentComment]);

  useEffect(() => {
    if (commentId) {
      callbackFetchCommentData();
    }
  }, [commentId, callbackFetchCommentData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const commentUrl = `${process.env.REACT_APP_API_HOST}/api/comments/${exerciseId}/${commentId}`;

    const fetchConfig = {
      method: "put",
      body: JSON.stringify({
        exercise_id: exerciseId,
        comment: comment,
        user_id: userId,
        assigned_date: format(new Date(), "yyyy-MM-dd"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    };

    try {
      const response = await fetch(commentUrl, fetchConfig);

      if (response.ok) {
        setComment("");
        setCurrentComment(comment);
        setSuccessMessage("Comment updated successfully.");
        window.location.href = `/comments/${exerciseId}`;
        onClose();
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
    const { value } = event.target;
    setComment(value);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="shadow p-5 mt-3 mb-3">
      <h1>Update Comment</h1>
      {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-floating mx-auto col-10 mb-3">
          <input
            placeholder=" "
            className="form-control"
            name="comment"
            type="text"
            value={comment}
            onChange={handleCommentChange}
          />
          <label htmlFor="comment">Comment</label>
        </div>
        <button className="btn btn-primary m-1">Submit</button>
        <button className="btn btn-secondary m-1" onClick={handleClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateComment;
