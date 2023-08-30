import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
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
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Signup</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleRegistration(e)}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              name="first"
              type="text"
              className="form-control"
              onChange={(e) => {
                setFirst(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              name="last"
              type="text"
              className="form-control"
              onChange={(e) => {
                setLast(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="text"
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                name="username"
                type="text"
                className="form-control"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="text"
              className="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div>
            <input className="btn btn-primary" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
