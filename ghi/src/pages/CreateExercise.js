import React, { useEffect, useState } from 'react';

function ExerciseForm() {
  const [exercises, setExercises] = useState([]);
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
      const newHat = await response.json();
      console.log(newHat);

      setWeight('');
      setName('');
      setSets('');
      setReps('');
      setPicture('');
      setDescription('');
      setDate('');
    }
  };

  const fetchData = async () => {
    const url = 'http://localhost:8000/api/exercises/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setExercises(data.exercises);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>create an exercise</h1>
          <form onSubmit={handleSubmit} id="create-exercise-form">
            <div className="mb-3">
              <label htmlFor="name">Exercise Name</label>
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
              <label htmlFor="weight">Weight</label>
              <input
                value={weight}
                onChange={handleWeightChange}
                required
                type="text"
                name="weight"
                id="weight"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sets">Sets</label>
              <input
                value={sets}
                onChange={handleSetsChange}
                required
                type="text"
                name="sets"
                id="sets"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reps">Reps</label>
              <input
                value={reps}
                onChange={handleRepsChange}
                type="url"
                name="reps"
                id="reps"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="picture">Picture URL</label>
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
              <label htmlFor="description">Description</label>
              <input
                value={description}
                onChange={handleDescriptionChange}
                type="text"
                name="description"
                id="description"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date">Date</label>
              <input
                value={date}
                onChange={handleDateChange}
                type="text"
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
