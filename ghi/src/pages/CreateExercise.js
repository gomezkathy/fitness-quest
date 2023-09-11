import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
function ExerciseForm() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  const { token } = useToken();
  const fetchAccount = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
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

    const exercisesUrl = `${process.env.REACT_APP_API_HOST}/api/exercises/`;

    const fetchConfig = {
      method: "post",
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

    const response = await fetch(exercisesUrl, fetchConfig);
    if (response.ok) {
      setWeight("");
      setName("");
      setSets("");
      setReps("");
      setPicture("");
      setDescription("");
    }
  };

  return (
    <div className="row content-container">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>create an exercise</h1>
          <form onSubmit={handleSubmit} id="create-exercise-form">
            <div className="mb-3">
              <label htmlFor="name">exercise name:</label>
              <input
                value={name}
                onChange={handleNameChange}
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="weight">weight used:</label>
              <input
                value={weight}
                onChange={handleWeightChange}
                type="number"
                name="weight"
                id="weight"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sets"># of sets:</label>
              <input
                value={sets}
                onChange={handleSetsChange}
                type="number"
                name="sets"
                id="sets"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reps"># of reps:</label>
              <input
                value={reps}
                onChange={handleRepsChange}
                type="number"
                name="reps"
                id="reps"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="picture">picture url:</label>
              <input
                value={picture}
                onChange={handlePictureChange}
                type="url"
                name="picture"
                id="picture"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description">description:</label>
              <input
                value={description}
                onChange={handleDescriptionChange}
                type="text"
                name="description"
                id="description"
                className="form-control"
              />
            </div>
            <button className="btn btn-primary">CREATE</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExerciseForm;
