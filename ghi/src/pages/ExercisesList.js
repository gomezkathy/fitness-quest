import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExerciseForm from "./CreateExercise";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [userId, setUserId] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [isExerciseFormOpen, setIsExerciseFormOpen] = useState(false);

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
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/exercises/${exerciseId}`,
        {
          method: "delete",
          credentials: "include",
        }
      );

      if (response.ok) {
        setExercises(
          exercises.filter((exercise) => exercise.id !== exerciseId)
        );
        setDeleteSuccess(true);
        setTimeout(() => {
          setDeleteSuccess(false);
        }, 1000);
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

  const userExercises = exercises.filter(
    (exercise) => exercise.user_id === userId
  );

  const toggleExerciseForm = () => {
    setIsExerciseFormOpen(!isExerciseFormOpen);
  };

  return (
    <div className="container content-container mt-4 mb-0">
      <div className="shadow p-4 mt-5">
        <div className="col-11 mt-5 mx-auto">
          {isExerciseFormOpen && (
            <div className="exercise-form-overlay">
              <div className="m-5 exercise-form-popup">
                <ExerciseForm onClose={toggleExerciseForm} />
              </div>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mt-0">All Exercises</h1>
            <button
              className="btn btn-success m-0"
              onClick={toggleExerciseForm}
            >
              Add Exercise
            </button>
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-striped mt-5 mb-5">
                <thead>
                  <tr>
                    <th scope="col" className="col-1">
                      Exercise
                    </th>
                    <th scope="col" className="col-1">
                      Weight
                    </th>
                    <th scope="col" className="col-1">
                      Sets
                    </th>
                    <th scope="col" className="col-1">
                      Reps
                    </th>
                    <th scope="col" className="col-2">
                      Description
                    </th>
                    <th scope="col" className="col-2">
                      Picture
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userExercises.map((exercise) => (
                    <tr key={exercise.id}>
                      <td className="center">{exercise.name || "-"}</td>
                      <td className="center">{exercise.weight || "-"}</td>
                      <td className="center">{exercise.sets || "-"}</td>
                      <td className="center">{exercise.reps || "-"}</td>
                      <td className="center">{exercise.description || "-"}</td>
                      <td className="center">
                        {exercise.picture_url ? (
                          <img
                            src={exercise.picture_url}
                            alt="exercise"
                            style={{ width: "100px" }}
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="center">
                        <Link
                          to={`/comments/${exercise.id}`}
                          className="btn btn-secondary m-1"
                        >
                          Comments
                        </Link>
                        <button
                          onClick={() => handleExerciseDelete(exercise.id)}
                          className="btn btn-danger m-1"
                        >
                          Delete
                        </button>
                        <Link to={`/exercises/update/${exercise.id}`}>
                          <button className="btn btn-primary m-1">Edit</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {deleteSuccess && (
            <div className="alert alert-danger mb-0" role="alert">
              Comment deleted successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExerciseList;
