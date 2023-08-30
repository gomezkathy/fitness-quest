import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import { Box } from "@mui/material";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import CreateWorkout from "./pages/CreateWorkout";
// import UpdateWorkout from "./pages/UpdateWorkout";
import "./App.css";
import Comments from "./pages/Comments";
import CommentForm from "./pages/CreateComment";
import ExerciseForm from "./pages/CreateExercise";
import Exercises from "./pages/Exercises";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts">
            <Route index element={<Workouts />} />
            <Route path="create" element={<CreateWorkout />} />{" "}
          </Route>
          <Route path="/comments">
            <Route index element={<Comments />} />
            <Route path="create" element={<CommentForm />} />{" "}
          </Route>
          <Route path="/exercises">
            <Route index element={<Exercises />} />
            <Route path="create" element={<ExerciseForm />} />{" "}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
