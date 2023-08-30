import React, { useState, useEffect } from "react";

function Comments() {
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState("");

  const fetchAllComments = async () => {
    const response = await fetch("http://localhost:8000/api/comments", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setComments(data);
    }
  };

  const fetchAccount = async () => {
    const response = await fetch("http://localhost:8000/token", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      const userId = data.account;
      setUserId(userId);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    fetchAllComments();
  }, []);

  const userComments = comments.filter((comment) => comment.user_id === userId);

  return (
    <div>
      <h1>Comments Log</h1>
      <div className="comments-container">
        {userComments.map((comment) => (
          <div key={comment.id} className="comment-box">
            <p className="comment-exercise">Exercise: EXAMPLE</p>
            <p className="comment-text">Comment: {comment.comment}</p>
            <p className="assigned-date">Date: {comment.assigned_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
