import React, { useState, useEffect } from "react";
import axios from "axios";
import useToken from "@galvanize-inc/jwtdown-for-react";
import jwtDecode from "jwt-decode";

function AccountInfo() {
  const { token } = useToken();
  const [accountId, setAccountId] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    first: "",
    last: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const accountIdFromToken = decodedToken.account.id;
      setAccountId(accountIdFromToken);
    }
  }, [token]);

  useEffect(() => {
    if (accountId) {
      const fetchAccountInfo = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_HOST}/api/accounts/${accountId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const accountData = response.data;
          setUserData(accountData);
        } catch (error) {
          console.error("Error fetching account information:", error);
        }
      };

      fetchAccountInfo();
    }
  }, [token, accountId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!userData.password) {
      setMessage(
        <div className="mt-3 alert alert-danger" role="alert">
          Password is required to update your account.
        </div>
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_HOST}/api/accounts/update/${accountId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage(
          <div className="mt-3 alert alert-success" role="alert">
            Account information updated successfully
          </div>
        );
      } else {
        setMessage(
          <div className="mt-3 alert alert-danger" role="alert">
            Error updating account information
          </div>
        );
      }

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(
        <div className="mt-3 alert alert-danger" role="alert">
          Error updating account information
        </div>
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className="content-container">
      <div className="col-12 col-md-6 mx-auto">
        <div className="shadow p-5 mt-3 mb-3">
          <h1 className="mb-3 mt-3">Update Account</h1>
          <form onSubmit={handleUpdate}>
            <div className="form-floating mx-auto col-10 mb-3">
              <input
                placeholder=" "
                className="form-control"
                name="username"
                type="text"
                value={userData.username}
                onChange={handleInputChange}
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mx-auto col-10 mb-3">
              <input
                placeholder=" "
                className="form-control"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mx-auto col-10 mb-3">
              <input
                placeholder=" "
                className="form-control"
                name="first"
                type="text"
                value={userData.first}
                onChange={handleInputChange}
              />
              <label htmlFor="first">First Name</label>
            </div>
            <div className="form-floating mx-auto col-10 mb-3">
              <input
                placeholder=" "
                className="form-control"
                name="last"
                type="text"
                value={userData.last}
                onChange={handleInputChange}
              />
              <label htmlFor="last">Last Name</label>
            </div>
            <div className="form-floating mx-auto col-10 mb-3">
              <input
                placeholder=" "
                className="form-control"
                name="email"
                type="text"
                value={userData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Update
            </button>
          </form>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
