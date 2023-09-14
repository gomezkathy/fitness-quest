import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect, useCallback } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const [setUserId] = useState(null);
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

  const fetchAccount = useCallback(async () => {
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
  }, [setUserId]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return (
    <div className="container mt-4 content-container">
      <div className="col-12 col-md-6 mx-auto">
        <div className="shadow p-4 mt-4">
          <h1 className="mb-5 mt-5">Login</h1>
          <div className="card-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-floating mx-auto col-10 mb-3">
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder=" "
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mx-auto col-10 mb-3">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder=" "
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
          </div>
          {showSuccessAlert && (
            <div className="alert alert-secondary mt-3" role="alert">
              <a href="/">Go to Homepage</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
