import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [userId, setUserId] = useState("");

  const fetchExercises = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/exercises`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setExercises(data);
    }
  };

  const fetchAccount = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
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
    fetchExercises();
  }, []);
  const handleExerciseDelete = async (exerciseId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/exercises/${exerciseId}`,
      {
        method: "delete",
        credentials: "include",
      }
    );
    if (response.ok) {
      setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
    }
  };

  const userExercises = exercises.filter(
    (exercise) => exercise.user_id === userId
  );

  return (
    <div>
      <h1>list of exercises</h1>
      <div className="exercises-container">
        {userExercises.map((exercise) => (
          <div key={exercise.id} className="exercise-box">
            <p className="exercise-text">
              <span className="emphasis">exercise:</span>&nbsp; {exercise.name}
            </p>

            <p className="exercise-text">
              <span className="emphasis">weight used:</span>&nbsp;{" "}
              {exercise.weight}
            </p>
            <p className="exercise-text">
              <span className="emphasis">
                <strong># of sets: </strong>
              </span>
              &nbsp; {exercise.sets}
            </p>
            <p className="exercise-text">
              <span className="emphasis">
                <strong># of reps:</strong>
              </span>
              &nbsp; {exercise.reps}
            </p>
            <p className="exercise-text">
              <span className="emphasis">description:</span>&nbsp;{" "}
              {exercise.description}
            </p>
            <p className="exercise-text">
              <span className="emphasis">picture:</span>&nbsp;
              {exercise.picture_url && (
                <img
                  src={exercise.picture_url}
                  alt="exercise"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
            </p>
            <p>
              <Link
                to={`/comments/${exercise.id}`}
                className="btn btn-primary btn-link"
              >
                COMMENTS
              </Link>
            </p>
            <p className="exercise-text">
              <button
                onClick={() => handleExerciseDelete(exercise.id)}
                className="btn btn-danger"
              >
                DELETE
              </button>
              <Link to={`/exercises/update/${exercise.id}`}>
                <button className="btn btn-primary">EDIT</button>
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExerciseList;
