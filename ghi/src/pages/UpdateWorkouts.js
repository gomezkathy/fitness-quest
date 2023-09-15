import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function UpdateWorkouts() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const { token } = useToken();

  const [workoutName, setWorkoutName] = useState("");
  //   const [workout, setWorkout] = useState({
  //     workout_name: "",
  //     user_id: "",
  //   });
  useEffect(() => {
    async function fetchWorkoutData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/workouts/${workoutId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const data = response.data;
          setWorkoutName(data.workout_name);
        } else {
          throw new Error("Failed to fetch workout");
        }
      } catch (error) {
        console.error("Error while fetching workout:", error);
      }
    }

    fetchWorkoutData();
  }, [workoutId, token]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setWorkoutName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/workouts/${workoutId}`,
        {
          workout_name: workoutName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Workout updated successfully");
        navigate("/workouts");
      } else {
        console.error("Failed to update workout");
      }
    } catch (error) {
      console.error("Error while updating workout:", error);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Update Your Workout</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="workoutName">Workout Name:</label>
              <input
                type="text"
                name="workout_name"
                id="workoutName"
                className="form-control"
                value={workoutName}
                onChange={handleInputChange}
                required
              />
            </div>

            <button className="btn btn-primary" type="submit">
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateWorkouts;
