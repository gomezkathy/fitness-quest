import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const [userId, setUserId] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      e.target.reset();
      setShowSuccessAlert(true);
      fetchAccount();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const fetchAccount = async () => {
    try {
      const response = await fetch("http://localhost:8000/token", {
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
  }, []);

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
      {showSuccessAlert && (
        <div className="alert alert-success mt-3" role="alert">
          Login was successful! <a href="/">Go to Homepage</a>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
