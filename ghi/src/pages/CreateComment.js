import React, { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import useToken from "@galvanize-inc/jwtdown-for-react";

const fetchAccount = async (token, setUserId, setExercises) => {
  try {
    const [accountResponse, exercisesResponse] = await Promise.all([
      fetch(`${process.env.REACT_APP_API_HOST}/token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
      fetch(`${process.env.REACT_APP_API_HOST}/api/exercises`, {
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

function CreateComment({ onClose }) {
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useToken();

  const callbackfetchAccount = useCallback(() => {
    fetchAccount(token, setUserId, setExercises);
  }, [token, setUserId, setExercises]);

  useEffect(() => {
    callbackfetchAccount();
  }, [callbackfetchAccount]);

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

    const commentUrl = `${process.env.REACT_APP_API_HOST}/api/comments/`;
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
        }, 2000);
        window.location.href = `/comments`;
        onClose();
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

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="shadow p-5 mt-3 mb-3">
      <h1 className="text-center">Create Comment</h1>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} id="create-comment">
        <div className="form-floating mx-auto col-10 mb-3">
          <select
            placeholder=" "
            className="form-select mt-3 mb-3 pt-2 pb-2 pl-2"
            value={selectedExerciseId}
            onChange={(e) => setSelectedExerciseId(parseInt(e.target.value))}
            required
            name="select"
          >
            <label htmlFor="select">Select Exercise</label>
            <option value={0}>Exercise</option>
            {exercises
              .filter((exercise) => exercise.user_id === userId)
              .map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-floating mx-auto col-10 mb-3">
          <input
            className="form-control"
            onChange={handleCommentChange}
            value={comment}
            placeholder=" "
            required
            type="text"
            name="comment"
            id="comment"
          />
          <label htmlFor="comment">Comment</label>
        </div>
        <button className="btn btn-success m-1">Submit</button>
        <button className="btn btn-secondary m-1" onClick={handleClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateComment;
