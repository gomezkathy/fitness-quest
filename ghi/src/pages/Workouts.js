import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [userId, setUserId] = useState("");

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/workouts", {
        withCredentials: true, // Include credentials (cookies) in requests
      });

      if (response.status === 200) {
        setWorkouts(response.data);
      } else {
        throw new Error("Failed to fetch workouts");
      }
    } catch (error) {
      console.error("Error while fetching workouts:", error);
    }
  };

  const fetchAccount = async () => {
    try {
      const response = await axios.get("http://localhost:8000/token", {
        withCredentials: true, // Include credentials (cookies) in requests
      });

      if (response.status === 200) {
        const data = response.data;
        const fetchedUserId = data.account;
        setUserId(fetchedUserId);
      } else {
        throw new Error("Failed to fetch user account");
      }
    } catch (error) {
      console.error("Error while fetching user account:", error);
    }
  };

  useEffect(() => {
    fetchAccount();
    fetchWorkouts();
  }, []);

  const handleWorkoutDelete = (workoutId) => {
    try {
      // Optimistically remove the workout from the state immediately
      setWorkouts(workouts.filter((workout) => workout.id !== workoutId));

      // Send the delete request to the server
      axios.delete(`http://localhost:8000/api/workouts/${workoutId}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error while deleting workout:", error);
    }
  };

  return (
    <div>
      <h1>List of Workouts</h1>
      <div className="workouts-container">
        {workouts.map((workout) => (
          <div key={workout.id} className="workout-box">
            <p className="workout-text">
              <span className="emphasis">Workout Name:</span>&nbsp;
              {workout.workout_name}
            </p>
            {/* Add more workout details here */}
            <p>
              <Link to={`/workouts/update/${workout.id}`}>
                <button className="btn btn-primary">EDIT</button>
              </Link>
              <button
                onClick={() => handleWorkoutDelete(workout.id)}
                className="btn btn-danger"
              >
                DELETE
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
