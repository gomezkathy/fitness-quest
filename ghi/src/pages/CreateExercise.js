import React, { useEffect, useState } from 'react';

function ExerciseForm() {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [picture, setPicture] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

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

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};

    data.name = name;
    data.weight = weight;
    data.sets = sets;
    data.reps = reps;
    data.picture_url = picture;
    data.description = description;
    data.assigned_date = date;

    console.log(data);

    const exercisesUrl = 'http://localhost:8000/api/exercises/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(exercisesUrl, fetchConfig);
    if (response.ok) {
      const newExercise = await response.json();
      console.log(newExercise);

      setWeight('');
      setName('');
      setSets('');
      setReps('');
      setPicture('');
      setDescription('');
      setDate('');
    }
  };


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>create an exercise</h1>
          <form onSubmit={handleSubmit} id="create-exercise-form">
            <div className="mb-3">
              <label htmlFor="name">exercise name:</label>
              <input
                value={name}
                onChange={handleNameChange}
                required type="text"
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
                required type="number"
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
                required type="number"
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
                required type="number"
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
                required type="text"
                name="description"
                id="description"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date">assigned date:</label>
              <input
                value={date}
                onChange={handleDateChange}
                required type="date"
                name="date"
                id="date"
                className="form-control"
              />
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExerciseForm;
