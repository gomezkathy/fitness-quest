import React, { useState, useEffect } from "react";
import { format } from "date-fns";

function CreateComment() {
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState(0);
  const [exercises, setExercises] = useState([]);

  const fetchAccount = async () => {
    try {
      const [accountResponse, exercisesResponse] = await Promise.all([
        fetch("http://localhost:8000/token", {
          credentials: "include",
        }),
        fetch("http://localhost:8000/api/exercises", {
          credentials: "include",
        }),
      ]);

      if (accountResponse.ok && exercisesResponse.ok) {
        const accountData = await accountResponse.json();
        const userId = accountData.account;
        setUserId(userId);

        const exercisesData = await exercisesResponse.json();
        setExercises(exercisesData);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedExerciseId === 0) {
      console.error("Selected exercise ID is 0. Aborting submit.");
      return;
    }

    console.log("Submitting comment...");
    console.log("Comment:", comment);
    console.log("User ID:", userId);
    console.log("Exercise ID:", selectedExerciseId);

    const requestBody = {
      user_id: userId,
      exercise_id: selectedExerciseId,
      comment,
      assigned_date: format(new Date(), "yyyy-MM-dd"),
    };
    console.log("Request Payload:", requestBody);

    const commentUrl = "http://localhost:8000/api/comments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    try {
      const response = await fetch(commentUrl, fetchConfig);

      if (response.ok) {
        console.log("Comment submitted successfully.");
        window.location.href = "http://localhost:3000/comments";
      } else {
        console.error(
          "Failed to create comment:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while creating comment:", error);
    }
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
          <select
            value={selectedExerciseId}
            onChange={(e) => setSelectedExerciseId(parseInt(e.target.value))}
            required
          >
            <option value={0}>Select an exercise</option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
          <br />
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
