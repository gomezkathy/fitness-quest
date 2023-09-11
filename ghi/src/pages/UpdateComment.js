import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import useToken from "@galvanize-inc/jwtdown-for-react";

function UpdateComment() {
  const { exerciseId, commentId } = useParams();
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

  const callbackfetchCommentData = useCallback(fetchCommentData, [
    commentId,
    exerciseId,
    token,
  ]);

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    if (commentId) {
      callbackfetchCommentData();
    }
  }, [commentId, callbackfetchCommentData]);

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
    <div className="container mt-5">
      <div className="row">
        <div className="col-8 offset-md-2 mx-auto">
          <div className="shadow p-4 mt-5">
            <h1>Update Comment</h1>
            {successMessage && (
              <div className="alert alert-success mt-3">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit} id="update-comment">
              <div className="mb-3">
                <input
                  onChange={handleCommentChange}
                  value={comment}
                  placeholder={currentComment}
                  required
                  className="form-control"
                  type="text"
                  name="comment"
                  id="comment"
                />
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateComment;
