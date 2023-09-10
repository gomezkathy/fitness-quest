import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from "react-router-dom";

function UpdateExerciseForm() {
  const { exerciseId } = useParams();

  const [name, setName] = useState(null);
  const [weight, setWeight] = useState(null);
  const [sets, setSets] = useState(null);
  const [reps, setReps] = useState(null);
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState(null);
  const [userId, setUserId] = useState(null);

  const { token } = useToken();

  useEffect(() => {
    async function fetchExerciseData() {
      const exerciseUrl = `http://localhost:8000/api/exercises/${exerciseId}`;
      const response = await fetch(exerciseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          const {
            name,
            weight,
            sets,
            reps,
            picture_url,
            description,
            user_id,
          } = data;
          setName(name || null);
          setWeight(weight !== null ? parseInt(weight) : null);
          setSets(sets !== null ? parseInt(sets) : null);
          setReps(reps !== null ? parseInt(reps) : null);
          setPicture(picture_url || null);
          setDescription(description || null);
          setUserId(user_id || null);
        }
      }
    }

    fetchExerciseData();
  }, [exerciseId, token]);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleWeightChange = (event) => {
    const value = event.target.value;
    setWeight(value === "" ? null : parseInt(value));
  };

  const handleSetsChange = (event) => {
    const value = event.target.value;
    setSets(value === "" ? null : parseInt(value));
  };

  const handleRepsChange = (event) => {
    const value = event.target.value;
    setReps(value === "" ? null : parseInt(value));
  };

  const handlePictureChange = (event) => {
    const value = event.target.value;
    setPicture(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const exercisesUrl = `http://localhost:8000/api/exercises/${exerciseId}`;

    const fetchConfig = {
      method: "put",
      body: JSON.stringify({
        name,
        weight,
        sets,
        reps,
        picture_url: picture,
        description,
        user_id: userId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    };

    const response = await fetch(exercisesUrl, fetchConfig);
    if (response.ok) {
      console.log("exercise was updated");
    } else {
      console.error("error updating exercise");
    }
  };
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>update your exercise</h1>
          <form onSubmit={handleSubmit} id="update-exercise-form">
            <div className="mb-3">
              <label htmlFor="name">exercise name:</label>
              <input
                value={name === null ? "" : name}
                onChange={handleNameChange}
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter exercise name..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="weight">weight used:</label>
              <input
                value={weight === null ? "" : weight}
                onChange={handleWeightChange}
                type="number"
                name="weight"
                id="weight"
                className="form-control"
                placeholder="lb..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sets"># of sets:</label>
              <input
                value={sets === null ? "" : sets}
                onChange={handleSetsChange}
                type="number"
                name="sets"
                id="sets"
                className="form-control"
                placeholder="# of sets..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reps"># of reps:</label>
              <input
                value={reps === null ? "" : reps}
                onChange={handleRepsChange}
                type="number"
                name="reps"
                id="reps"
                className="form-control"
                placeholder="# of reps..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="picture">picture url:</label>
              <input
                value={picture === null ? "" : picture}
                onChange={handlePictureChange}
                type="url"
                name="picture"
                id="picture"
                className="form-control"
                placeholder="Picture URL..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description">description:</label>
              <input
                value={description === null ? "" : description}
                onChange={handleDescriptionChange}
                type="text"
                name="description"
                id="description"
                className="form-control"
                placeholder="Exercise description..."
              />
            </div>
            <button className="btn btn-primary">UPDATE</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateExerciseForm;
