import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useToken();
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    const accountData = {
      first: first,
      last: last,
      email: email,
      username: username,
      password: password,
    };
    try {
      await register(
        accountData,
        `${process.env.REACT_APP_API_HOST}/api/accounts`
      );
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-3 content-container">
      <div className="col-12 col-md-6 mx-auto">
        <div className="shadow p-5 mt-3 mb-3">
          <h1 className="mb-3 mt-3">Sign Up</h1>
          <div className="card-body">
            <form onSubmit={(e) => handleRegistration(e)}>
              <div className="form-floating mx-auto col-10 mb-3">
                <input
                  placeholder=" "
                  name="first"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setFirst(e.target.value);
                  }}
                />
                <label htmlFor="first">First Name</label>
              </div>
              <div className="form-floating mx-auto col-10 mb-3">
                <input
                  placeholder=" "
                  name="last"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setLast(e.target.value);
                  }}
                />
                <label htmlFor="last">Last Name</label>
              </div>
              <div className="form-floating mx-auto col-10 mb-3">
                <input
                  placeholder=" "
                  name="email"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating mx-auto col-10 mb-3">
                <input
                  placeholder=" "
                  name="username"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mx-auto col-10 mb-3">
                <input
                  placeholder=" "
                  name="password"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div>
                <input
                  className="btn btn-primary mb-3"
                  type="submit"
                  value="Register"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
