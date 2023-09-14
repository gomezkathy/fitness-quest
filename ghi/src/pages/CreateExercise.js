import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function ExerciseForm({ onClose }) {
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
      window.location.href = `/exercises`;
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="shadow p-4">
      <h1 className="mb-3">Create Exercise</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mx-auto col-10 mb-3">
          <input
            value={name}
            onChange={handleNameChange}
            required
            type="text"
            placeholder=" "
            name="name"
            id="name"
            className="form-control"
          />
          <label htmlFor="name">Exercise</label>
        </div>
        <div className="form-floating mx-auto col-10 mb-3">
          <input
            value={weight}
            onChange={handleWeightChange}
            type="number"
            placeholder=" "
            name="weight"
            id="weight"
            className="form-control"
          />
          <label htmlFor="weight">Weight</label>
        </div>
        <div className="form-floating mx-auto col-10 mb-3">
          <input
            value={sets}
            onChange={handleSetsChange}
            type="number"
            placeholder=" "
            name="sets"
            id="sets"
            className="form-control"
          />
          <label htmlFor="sets"># of Sets</label>
        </div>
        <div className="form-floating mx-auto col-10 mb-3">
          <input
            value={reps}
            onChange={handleRepsChange}
            type="number"
            placeholder=" "
            name="reps"
            id="reps"
            className="form-control"
          />
          <label htmlFor="reps"># of Reps</label>
        </div>
        <div className="form-floating mx-auto col-10 mb-3">
          <input
            value={picture}
            onChange={handlePictureChange}
            type="url"
            placeholder=" "
            name="picture"
            id="picture"
            className="form-control"
          />
          <label htmlFor="picture">Picture URL</label>
        </div>
        <div className="form-floating mx-auto col-10 mb-3">
          <input
            value={description}
            onChange={handleDescriptionChange}
            type="text"
            placeholder=" "
            name="description"
            id="description"
            className="form-control"
          />
          <label htmlFor="description">Description</label>
        </div>
        <button className="btn btn-primary m-1">Submit</button>
        <button className="btn btn-secondary m-1" onClick={handleClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ExerciseForm;
