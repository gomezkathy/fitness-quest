import React, { useEffect, useState }  from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

import "./App.css";


// AUTH


// WORKOUTS
import Workouts from "./pages/Workouts";
import CreateWorkout from "./pages/CreateWorkout";

// EXERCISES



// COMMENTS
import Comments from "./pages/Comments";
import CommentForm from "./pages/CreateComment";
import ExerciseForm from "./pages/CreateExercise";
import ExerciseList from "./pages/ExercisesList";
import UpdateExerciseForm from "./pages/UpdateExerciseForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

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
