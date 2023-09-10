import React, { useState, useEffect } from "react";
import axios from "axios";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { format } from "date-fns";

function CreateWorkout({ addWorkout }) {
  const [workoutName, setWorkoutName] = useState("");
  const [exerciseId, setExerciseId] = useState(null);
  const [commentId, setCommentId] = useState(null);

  const { token } = useToken();
  const { user } = useToken(); // Get the user object directly from useToken

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!user) {
      console.error("User is not authenticated. Aborting submit.");
      return;
    }

    // Create a new workout object
    const newWorkout = {
      workout_name: workoutName,
      exercise_id: exerciseId,
      comment_id: commentId,
      user_id: user.id, // ID from object
    };

    try {
      // Make a POST request to create a new workout
      const response = await axios.post(
        "http://localhost:8000/api/workouts",
        newWorkout,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // Workout created successfully
        addWorkout(response.data);
        // Clears forms
        setWorkoutName("");
        setExerciseId(null);
        setCommentId(null);
      }
    } catch (error) {
      console.error("Error creating workout:", error);
    }
  };

  return (
    <div>
      <h3>Create a New Workout</h3>
      <form onSubmit={handleSubmit}>
        {/* ... (other form elements) */}
        <button type="submit" className="btn btn-primary">
          Create!
        </button>
      </form>
    </div>
  );
}

export default CreateWorkout;
