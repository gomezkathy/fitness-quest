import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
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
