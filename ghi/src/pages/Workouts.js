// Imports!
import React, { useEffect, useState } from "react";
import WorkoutList from "../pages/WorkoutList";
import CreateWorkout from "./CreateWorkout";
import axios from "axios";
// axios instead of fetch
function Workouts() {
  // create your variables
  const [workouts, setWorkouts] = useState([]); // The list of workouts
  const [loading, setLoading] = useState(true); // Loading bar for better user experience
  // we don't need the loading thing, but it's a cool funtionality so I say we keep it so we can talk about something in our presentation
  // grab list of workouts
  useEffect(() => {
    axios.get("http://localhost:8000/api/workouts").then((response) => {
      setWorkouts(response.data); // Update the 'workouts' state with data we grabbed
      setLoading(false); // Set loading bar to false when the data's loaded!
    });
  }, []); // makes sure it only runs once when mounted

  // adds new workout function
  const addWorkout = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]); // update the state of workouts, adds the new workout!
  };

  // Rendering stuff
  return (
    <div>
      <h2>Workouts</h2>
      {loading ? (
        <p>Loading..!</p>
      ) : (
        <>
          {/* Render CreateWorkout component, passing addWorkout as prop */}
          <CreateWorkout addWorkout={addWorkout} />
          {/* Render WorkoutList comp, passing workouts as the prop */}
          <WorkoutList workouts={workouts} />
        </>
      )}
    </div>
  );
}

// can have export above or below, just make sure only 1
export default Workouts;
