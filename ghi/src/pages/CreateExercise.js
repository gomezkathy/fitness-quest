import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function ExerciseForm({ onClose }) {
  const { token } = useToken();
  const [userId, setUserId] = useState("");
  const [details, setDetails] = useState({
    name: "",
    weight: "",
    sets: "",
    reps: "",
    picture: "",
    description: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const exercisesUrl = `${process.env.REACT_APP_API_HOST}/api/exercises/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify({
        ...details,
        weight: parseInt(details.weight),
        sets: parseInt(details.sets),
        reps: parseInt(details.reps),
        picture_url: details.picture,
        description: details.description,
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
      setDetails({
        ...details,
        name: "",
        weight: "",
        sets: "",
        reps: "",
        picture: "",
        description: "",
      });
      window.location.href = `/exercises`;
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div className="shadow p-5 mt-3 mb-3">
      <h1 className="mb-3">Create Exercise</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mx-auto col-10 mb-3">
          <input
            value={details.name}
            onChange={handleChange}
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
            value={details.weight}
            onChange={handleChange}
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
            value={details.sets}
            onChange={handleChange}
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
            value={details.reps}
            onChange={handleChange}
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
            value={details.picture}
            onChange={handleChange}
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
            value={details.description}
            onChange={handleChange}
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
