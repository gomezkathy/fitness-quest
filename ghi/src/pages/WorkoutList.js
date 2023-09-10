import React from "react";

function WorkoutList({ workouts }) {
  return (
    <div>
      <h3>Workout List</h3>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>{workout.workout_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutList;
