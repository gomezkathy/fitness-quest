import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import { Box } from "@mui/material";
import NavBar from ',/components/NavBar';
import './App.css'
export default funtion App() {
  return (
    <BrowserRouter>
      <div className='App'>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Workouts">
            <Route index element={<Workouts />} />
            <Route path="Create" element={<CreateWorkout />} />
            <Route path="Update" element={<UpdateWorkout />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
