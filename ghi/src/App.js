import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

// AUTH
import LoginForm from "./Accounts/LoginForm";
import Logout from "./Accounts/Logout";
import SignupForm from "./Accounts/SignupForm";

// WORKOUTS
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
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/workouts">
              <Route index element={<Workouts />} />
              <Route path="create" element={<CreateWorkout />} />
            </Route>
            <Route path="/comments">
              <Route index element={<Comments />} />
              <Route path="create" element={<CommentForm />} />
            </Route>
            <Route path="/exercises">
              <Route index element={<Exercises />} />
              <Route path="create" element={<ExerciseForm />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
