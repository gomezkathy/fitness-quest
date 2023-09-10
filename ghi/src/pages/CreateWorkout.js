import React, { useState, useEffect } from "react";
import axios from "axios";
import useToken from "@galvanize-inc/jwtdown-for-react";

function CreateWorkouts() {
  const [userId, setUserId] = useState(null);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [comment, setComment] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const { token } = useToken();

  useEffect(() => {
    fetchAvailableExercises();
    // When token is recieved, Fetch user ID and avail exercises
    fetchUserId();
  }, [token]);

  const fetchAvailableExercises = async () => {
    const exercisesUrl = "http://localhost:8000/api/exercises";
    try {
      const response = await axios.get(exercisesUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.status === 200) {
        setAvailableExercises(response.data);
      } else {
        console.error(
          "Failed to fetch available exercises:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while fetching available exercises:", error);
    }
  };

  const fetchUserId = async () => {
    const response = await fetch("http://localhost:8000/token", {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const fetchedUserId = data.account;
      setUserId(fetchedUserId);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedExercises);
    const requestBody = {
      user_id: userId,
      workout_name: workoutName,
      comment: comment,
      exercise_id: selectedExercises[0]?.id : null,
    };

    const workoutUrl = "http://localhost:8000/api/workouts";
    const fetchConfig = {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    };

    const data = JSON.stringify(requestBody);
    try {
      const response = await axios.post(workoutUrl, data, fetchConfig);

      if (response.status === 200) {
        // if workout created successfully, reset the form
        setWorkoutName("");
        setComment("");
        setSelectedExercises([]);
      } else {
        console.error(
          "Failed to create workout:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while creating workout:", error);
    }
  };

  const handleExerciseSelection = (event) => {
    const selectedIds = Array.from(event.target.selectedOptions).map((option) =>
      parseInt(option.value)
    );
    const selectedExercises = availableExercises.filter((exercise) =>
      selectedIds.includes(exercise.id)
    );
    setSelectedExercises(selectedExercises);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6 mx-auto">
          <div className="shadow p-4">
            <h1 className="text-center">Create a Workout</h1>
            <form onSubmit={handleSubmit} id="create-workout">
              <div className="mb-3">
                <input
                  className="form-control"
                  onChange={(e) => setWorkoutName(e.target.value)}
                  value={workoutName}
                  placeholder="Workout Name"
                  required
                  type="text"
                  name="workoutName"
                  id="workoutName"
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  placeholder="Add a comment..."
                  type="text"
                  name="comment"
                  id="comment"
                />
              </div>
              <div className="mb-3">
                <label>Select Exercises:</label>
                <select
                  multiple
                  className="form-control"
                  onChange={handleExerciseSelection}
                >
                  {availableExercises.map((exercise) => (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label>Selected Exercises:</label>
                <ul>
                  {selectedExercises.map((exercise) => (
                    <li key={exercise.id}>{exercise.name}</li>
                  ))}
                </ul>
              </div>
              <button className="btn btn-primary mb-3">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkouts;
