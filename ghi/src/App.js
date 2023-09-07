import React, { useEffect, useState }  from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import CreateWorkout from "./pages/CreateWorkout";

// EXERCISES
import ExerciseForm from "./pages/CreateExercise";
import Exercises from "./pages/Exercises";

// COMMENTS
import Comments from "./pages/Comments";
import CommentForm from "./pages/CreateComment";

export default function App() {


  return (
    <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workouts">
              <Route index element={<Workouts />} />
              <Route path="create" element={<CreateWorkout />} />
            </Route>
            <Route path="/comments">
              <Route index element={<Comments />} />
              <Route path="create" element={<CommentForm />} />
            </Route>
            <Route path="/exercises">
              <Route index element={<ExerciseList/>}/>
              <Route path="create" element={<ExerciseForm />} />
              <Route path="update/:exerciseId" element={<UpdateExerciseForm />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
