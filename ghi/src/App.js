import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import { Box } from "@mui/material";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import CreateWorkout from "./pages/CreateWorkout";
// import UpdateWorkout from "./pages/UpdateWorkout";
import "./App.css";
export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Workouts">
            <Route index element={<Workouts />} />
            <Route path="Create" element={<CreateWorkout />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
