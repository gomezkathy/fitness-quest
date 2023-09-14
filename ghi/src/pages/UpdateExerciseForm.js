import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from "react-router-dom";

function UpdateExerciseForm() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const { token } = useToken();
  const { exerciseId } = useParams();

  useEffect(() => {
    const fetchExerciseData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/exercises/${exerciseId}`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setName(data.name || "");
          setWeight(data.weight ? data.weight.toString() : "");
          setSets(data.sets ? data.sets.toString() : "");
          setReps(data.reps ? data.reps.toString() : "");
          setPicture(data.picture_url || "");
          setDescription(data.description || "");
          setUserId(data.user_id || "");
        }
      }
    };

    fetchExerciseData();
  }, [exerciseId]);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleWeightChange = (event) => {
    const value = event.target.value;
    setWeight(value);
  };

  const handleSetsChange = (event) => {
    const value = event.target.value;
    setSets(value);
  };

  const handleRepsChange = (event) => {
    const value = event.target.value;
    setReps(value);
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

    const exercisesUrl = `${process.env.REACT_APP_API_HOST}/api/exercises/${exerciseId}`;

    const fetchConfig = {
      method: "put",
      body: JSON.stringify({
        name,
        weight: parseInt(weight),
        sets: parseInt(sets),
        reps: parseInt(reps),
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

    await fetch(exercisesUrl, fetchConfig);
    window.location.href = `/exercises`;
  };

  return (
    <div className="container mt-4 content-container">
      <div className="col-12 col-md-8 mx-auto">
        <div className="shadow p-4 mt-4">
          <h1>Update Exercise</h1>
          <form onSubmit={handleSubmit} id="update-exercise-form">
            <div className="form-floating mx-auto col-10 mb-3">
              <input
                placeholder=" "
                value={name}
                onChange={handleNameChange}
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Exercise</label>
            </div>
            <div className="form-floating mx-auto col-10 mb-3">
              <input
                placeholder=" "
                value={weight}
                onChange={handleWeightChange}
                type="number"
                name="weight"
                id="weight"
                className="form-control"
              />
              <label htmlFor="weight">Weight</label>
            </div>
            <div className="form-floating mx-auto col-10 mb-3">
              <label htmlFor="sets"># of Sets</label>
              <input
                placeholder=" "
                value={sets}
                onChange={handleSetsChange}
                type="number"
                name="sets"
                id="sets"
                className="form-control"
              />
            </div>
            <div className="form-floating mx-auto col-10 mb-3">
              <input
                placeholder=" "
                value={reps}
                onChange={handleRepsChange}
                type="number"
                name="reps"
                id="reps"
                className="form-control"
              />
              <label htmlFor="reps"># of Reps</label>
            </div>
            <div className="form-floating mx-auto col-10 mb-3">
              <input
                placeholder=" "
                value={picture}
                onChange={handlePictureChange}
                type="url"
                name="picture"
                id="picture"
                className="form-control"
              />
              <label htmlFor="picture">Picture URL</label>
            </div>
            <div className="form-floating mx-auto col-10 mb-3">
              <input
                placeholder=" "
                value={description}
                onChange={handleDescriptionChange}
                type="text"
                name="description"
                id="description"
                className="form-control"
              />
              <label htmlFor="description">Description</label>
            </div>
            <button className="btn btn-primary mb-3">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateExerciseForm;
