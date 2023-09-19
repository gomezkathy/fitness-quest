import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import useToken from "@galvanize-inc/jwtdown-for-react";

function CreateComment({ onClose }) {
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useToken();
  const [details, setDetails] = useState({
    comment: "",
    exercise_id: "",
  });

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

  useEffect(() => {
    fetchAccount(token, setUserId, setExercises);
  }, [token, setUserId, setExercises]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedExerciseId === 0) {
      console.error("Selected exercise ID is 0. Aborting submit.");
      return;
    }

    const commentUrl = `${process.env.REACT_APP_API_HOST}/api/comments/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify({
        ...details,
        user_id: details.userId,
        exercise_id: details.selectedExerciseId,
        comment: details.comment,
        assigned_date: format(new Date(), "yyyy-MM-dd"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    };
    const response = await fetch(commentUrl, fetchConfig);
    if (response.ok) {
      setDetails({
        ...details,
        exercise_id: "",
        comment: "",
      });
      setSuccessMessage("Comment submitted successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      window.location.href = `/comments`;
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
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
          <label htmlFor="select">Select Exercise</label>
          <select
            id="select"
            placeholder="Select Exercise"
            className="form-select mt-3 mb-3 pt-2 pb-2 pl-2"
            value={details.exercise_id}
            onChange={handleChange}
            required
            name="select"
          >
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
            onChange={handleChange}
            value={details.comment}
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
