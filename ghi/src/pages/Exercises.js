import React, { useState, useEffect } from "react";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [userId, setUserId] = useState("");

  const fetchExercises = async () => {
    const response = await fetch("http://localhost:8000/api/exercises", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setExercises(data);
    }
  };

  const fetchAccount = async () => {
    const response = await fetch("http://localhost:8000/token", {
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

  const userExercises = exercises.filter((exercise) => exercise.user_id === userId);

  return (
    <>
    <div>
      <h1>list of exercises</h1>
      <table className="table table-striped">
        <thead className="table-primary">
          <tr>
            <th>exercise name</th>
            <th>weight used</th>
            <th># of sets</th>
            <th># of reps</th>
            <th>picture</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise.id}>
              <td>{exercise.name}</td>
              <td>{exercise.weight}</td>
              <td>{exercise.sets}</td>
              <td>{exercise.reps}</td>
              <td>{exercise.picture_url}</td>
              <td>{exercise.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}

export default ExerciseList;
