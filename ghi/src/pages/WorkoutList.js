function WorkoutList({ workouts }) {
  return (
    <div>
      <h3>Workout List</h3>
      <ul>
        {workouts &&
          workouts.map((workout) => (
            <li key={workout.id}>{workout.workout_name}</li>
          ))}
      </ul>
    </div>
  );
}

export default WorkoutList;
