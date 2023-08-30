import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-transparent-png.png";
import "../App.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <Link to="/">
          <img className="navbar-logo" src={logo} alt="Logo" />
        </Link>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/workouts" className="nav-link">
            Workouts
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/workouts/create" className="nav-link">
            Create Workout
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/workouts" className="nav-link">
            Exercises
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/workouts/create" className="nav-link">
            Create Exercise
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/comments" className="nav-link">
            Comments
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/comments/create" className="nav-link">
            Create Comment
          </Link>
        </li>
      </ul>
    </nav>
  );
}
