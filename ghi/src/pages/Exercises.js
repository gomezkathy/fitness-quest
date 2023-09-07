import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [userId, setUserId] = useState("");

  const { token } = useToken();
  const fetchAccount = async () => {
    const response = await fetch("http://localhost:8000/token", {
      credentials: "include",
    });
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      const userId = data.account;
      setUserId(userId);
    }
  };


  async function getExercises() {
    const response = await fetch(`http://localhost:8000/api/exercises/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if(response.ok) {
      const { exercises } = await response.json();
      setExercises(exercises);
    } else (
      console.error('An error occured fetching the exercise data')
    )
  }
  useEffect(() => {
    getExercises();
    fetchAccount();
  }, [])
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
