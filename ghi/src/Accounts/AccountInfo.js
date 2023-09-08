import React, { useState, useEffect } from "react";
import axios from "axios";
import useToken from "@galvanize-inc/jwtdown-for-react";
import jwtDecode from "jwt-decode";

function AccountInfo() {
  const { token } = useToken();
  const [accountId, setAccountId] = useState(""); // State to store account ID
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
            `http://localhost:8000/api/accounts/${accountId}`,
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
    try {
      const response = await axios.put(
        `http://localhost:8000/api/accounts/update/${accountId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Account information updated successfully");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage("Error updating account information");

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
    <div>
      <h2>Update Account Information</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Username:</label>
          <input
            name="username"
            type="text"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>First Name:</label>
          <input
            name="first"
            type="text"
            value={userData.first}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Last Name:</label>
          <input
            name="last"
            type="text"
            value={userData.last}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            name="email"
            type="text"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Account Info</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AccountInfo;
