import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";

function Comments() {
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState("");
  const [exerciseNames, setExerciseNames] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { exerciseId } = useParams();
  const exerciseIdAsNumber = parseInt(exerciseId, 10);
  console.log("Exercise ID:", exerciseId);

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

  const fetchAllComments = async () => {
    try {
      let url = "http://localhost:8000/api/comments";
      if (exerciseId) {
        url += `?exercise_id=${exerciseId}`;
      }

      const response = await fetch(url, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);

        const exerciseIds = data.map((comment) => comment.exercise_id);

        const exerciseNamesResponse = await fetch(
          `http://localhost:8000/api/exercises`,
          {
            credentials: "include",
          }
        );

        if (exerciseNamesResponse.ok) {
          const exerciseNames = await exerciseNamesResponse.json();
          const exerciseNameMap = {};
          exerciseNames.forEach((exercise) => {
            exerciseNameMap[exercise.id] = exercise.name;
          });

          setExerciseNames(exerciseNameMap);

          const commentsWithExerciseNames = data.map((comment) => {
            const exerciseName = exerciseNameMap[comment.exercise_id];
            return {
              ...comment,
              exercise_name: exerciseName || "Unknown Exercise",
            };
          });
          setComments(commentsWithExerciseNames);
        }
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        fetchAllComments();
      } else {
        console.error(
          "Failed to delete comment:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while deleting comment:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      console.log("exerciseId data type:", typeof exerciseIdAsNumber);
      const payload = {
        user_id: userId,
        exercise_id: exerciseIdAsNumber,
        comment: newComment,
        assigned_date: format(new Date(), "yyyy-MM-dd"),
      };

      console.log("Sending data:", JSON.stringify(payload));
      console.log("New Comment Data:", payload);

      const response = await fetch(`http://localhost:8000/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      console.log("Response:", response);

      if (response.ok) {
        fetchAllComments();
        setNewComment("");
      } else {
        console.error(
          "Failed to add comment:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while adding comment:", error);
    }
  };

  useEffect(() => {
    console.log("Exercise ID:", exerciseIdAsNumber);
    const fetchData = async () => {
      await fetchAccount();
      fetchAllComments();
    };

    fetchData();
  }, [exerciseIdAsNumber]);

  const userComments = comments.filter((comment) => comment.user_id === userId);

  return (
    <div>
      <h1>Comments Log</h1>
      <div className="comments-container">
        {userComments.map((comment) => (
          <div key={comment.id} className="comment-box">
            <p className="comment-exercise">
              Exercise: {exerciseNames[comment.exercise_id] || "Unknown"}
            </p>
            <p className="comment-text">Comment: {comment.comment}</p>
            <p className="assigned-date">Date: {comment.assigned_date}</p>
            <Link
              className="btn btn-primary btn-link"
              to={`/comments/${exerciseId}/${comment.id}`}
            >
              Edit
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteComment(comment.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="comment-input">
        <h2>Add a Comment</h2>
        <textarea
          rows="4"
          cols="50"
          placeholder="Enter your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddComment}>
          Post
        </button>
      </div>
    </div>
  );
}

export default Comments;
