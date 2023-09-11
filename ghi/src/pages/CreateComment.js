import React, { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import useToken from "@galvanize-inc/jwtdown-for-react";

function CreateComment() {
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useToken();
  const fetchAccount = async () => {
    try {
      const [accountResponse, exercisesResponse] = await Promise.all([
        fetch("http://localhost:8000/token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }),
        fetch("http://localhost:8000/api/exercises", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const callbackfetchAccount = useCallback(() => {
    fetchAccount();
  }, [fetchAccount]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedExerciseId === 0) {
      console.error("Selected exercise ID is 0. Aborting submit.");
      return;
    }

    const requestBody = {
      user_id: userId,
      exercise_id: selectedExerciseId,
      comment,
      assigned_date: format(new Date(), "yyyy-MM-dd"),
    };

    const commentUrl = "http://localhost:8000/api/comments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    };

    try {
      const response = await fetch(commentUrl, fetchConfig);

      if (response.ok) {
        setSuccessMessage("Comment submitted successfully.");
        setTimeout(() => {
          setSuccessMessage("");
          window.location.href = "http://localhost:3000/comments";
        }, 2000);
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6 mx-auto">
          <div className="shadow p-4">
            <h1 className="text-center">Create a Comment</h1>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} id="create-comment">
              <div className="mb-3">
                <select
                  className="form-select mt-4 mb-3"
                  value={selectedExerciseId}
                  onChange={(e) =>
                    setSelectedExerciseId(parseInt(e.target.value))
                  }
                  required
                >
                  <option value={0}>Select an exercise</option>
                  {exercises.map((exercise) => (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  onChange={handleCommentChange}
                  value={comment}
                  placeholder="Leave a comment..."
                  required
                  type="text"
                  name="comment"
                  id="comment"
                />
              </div>
              <button className="btn btn-primary mb-3">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateComment;
