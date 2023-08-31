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
import LoginForm from "./Accounts/LoginForm";
import Logout from "./Accounts/Logout";
import SignupForm from "./Accounts/SignupForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import AccountInfo from "./Accounts/AccountInfo";

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
            <Route path="/accountinfo" element={<AccountInfo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
