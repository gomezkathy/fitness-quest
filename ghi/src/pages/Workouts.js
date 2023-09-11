import React, { useEffect, useState } from "react";
import WorkoutList from "../pages/WorkoutList";
import CreateWorkout from "./CreateWorkout";
import axios from "axios";
import { Link } from "react-router-dom";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/workouts").then((response) => {
      setWorkouts(response.data);
      setLoading(false);
    });
  }, []);

  const addWorkout = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  const deleteWorkout = async (workoutId) => {
    try {
      await axios.delete(`http://localhost:8000/api/workouts/${workoutId}`);
      setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div>
      <h2>Workouts</h2>
      {loading ? (
        <p>Loading..!</p>
      ) : (
        <>
          <Link to="/create-workout" className="btn btn-primary">
            Create Workout
          </Link>
          <CreateWorkout addWorkout={addWorkout} />
          <WorkoutList workouts={workouts} onDelete={deleteWorkout} />
        </>
      )}
    </div>
  );
}
export default Workouts;
