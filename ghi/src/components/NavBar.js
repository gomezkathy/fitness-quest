import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-transparent-png.png";
import "../App.css";
import useToken from "@galvanize-inc/jwtdown-for-react";

export default function NavBar() {
  const [userId, setUserId] = useState(null);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const { logout, token } = useToken();

  const fetchAccount = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const userId = data.account;
        setUserId(userId);
      }
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, [userId]);

  const handleLogout = async () => {
    try {
      if (token) {
        await logout();
        setLogoutSuccess(true);
        setUserId(null);
        setTimeout(() => {
          setLogoutSuccess(false);
          window.location.href = "/";
        }, 250);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      window.location.href = "/";
    }
  };

  return (
    <div className="px-0 mx-0">
      <nav className="navbar">
        <ul className="nav-list">
          <Link to="/">
            <img className="navbar-logo" src={logo} alt="Logo" />
          </Link>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          {userId > 0 && (
            <li className="nav-item">
              <Link to="/workouts" className="nav-link">
                Workouts
              </Link>
            </li>
          )}
          {userId > 0 && (
            <li className="nav-item">
              <Link to="/workouts/create" className="nav-link">
                Create Workout
              </Link>
            </li>
          )}
          {userId > 0 && (
            <li className="nav-item">
              <Link to="/exercises" className="nav-link">
                Exercises
              </Link>
            </li>
          )}
          {userId > 0 && (
            <li className="nav-item">
              <Link to="/exercises/create" className="nav-link">
                Create Exercise
              </Link>
            </li>
          )}
          {userId > 0 && (
            <li className="nav-item">
              <Link to="/comments" className="nav-link">
                Comments
              </Link>
            </li>
          )}
          {userId > 0 && (
            <li className="nav-item">
              <Link to="/comments/create" className="nav-link">
                Create Comment
              </Link>
            </li>
          )}
        </ul>
        <ul className="nav-list p-0 m-3">
          {userId > 0 && (
            <li className="nav-item">
              <Link to={`/accounts/${userId}`} className="nav-link">
                Edit Account
              </Link>
            </li>
          )}
          {userId === null && (
            <li className="nav-item">
              <Link to="/accounts/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
          )}
          {userId === null && (
            <li className="nav-item">
              <Link to="/accounts/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
          {userId > 0 && (
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="custom-alert-bg">
        {logoutSuccess && (
          <div className="alert alert-danger px-0 mb-0" role="alert">
            User logged out successfully.
          </div>
        )}
      </div>
    </div>
  );
}
