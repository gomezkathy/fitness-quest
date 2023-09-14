import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo-transparent-png.png";
import "../App.css";
import useToken from "@galvanize-inc/jwtdown-for-react";

export default function NavBar() {
  const [userId, setUserId] = useState(null);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const { logout, token } = useToken();
  const location = useLocation();

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
        }, 0);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      window.location.href = "/";
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="px-0 mx-0">
      <nav className="navbar">
        <ul className="nav-list">
          <Link to="/">
            <img className="navbar-logo" src={logo} alt="Logo" />
          </Link>
          <li className="nav-item">
            <a
              className={`nav-link ${isActiveLink("/") ? "active" : ""}`}
              href="/"
            >
              Home
            </a>
          </li>
          {userId > 0 && (
            <li className="nav-item">
              <Link
                to="/workouts"
                className={`nav-link ${
                  isActiveLink("/workouts") ? "active" : ""
                }`}
              >
                Workouts
              </Link>
            </li>
          )}
          {userId > 0 && (
            <li className="nav-item">
              <Link
                to="/workouts/create"
                className={`nav-link ${
                  isActiveLink("/workouts/create") ? "active" : ""
                }`}
              >
                Create Workout
              </Link>
            </li>
          )}
          {userId > 0 && (
            <li className="nav-item">
              <Link
                to="/exercises"
                className={`nav-link ${
                  isActiveLink("/exercises") ? "active" : ""
                }`}
              >
                Exercises
              </Link>
            </li>
          )}
          {userId > 0 && (
            <li className="nav-item">
              <Link
                to="/comments"
                className={`nav-link ${
                  isActiveLink("/comments") ? "active" : ""
                }`}
              >
                Comments
              </Link>
            </li>
          )}
        </ul>
        <ul className="nav-list p-0 m-3">
          {userId > 0 && (
            <li className="nav-item">
              <Link
                to={`/accounts/${userId}`}
                className={`nav-link ${
                  isActiveLink(`/accounts/${userId}`) ? "active" : ""
                }`}
              >
                Edit Account
              </Link>
            </li>
          )}
          {userId === null && (
            <li className="nav-item">
              <Link
                to="/accounts/signup"
                className={`nav-link ${
                  isActiveLink("/accounts/signup") ? "active" : ""
                }`}
              >
                Sign Up
              </Link>
            </li>
          )}
          {userId === null && (
            <li className="nav-item">
              <Link
                to="/accounts/login"
                className={`nav-link ${
                  isActiveLink("/accounts/login") ? "active" : ""
                }`}
              >
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
    </div>
  );
}
