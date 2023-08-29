import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./Accounts/SignupForm.js";
import LoginForm from "./Accounts/LoginForm.js";
import Logout from "./Accounts/Logout.js";
import useToken from "@galvanize-inc/jwtdown-for-react";

function App() {
  const { token } = useToken();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (token) {
      setUser(JSON.parse(atob(token.split(".")[1])).account);
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/accounts">
        <Route path="signup" element={<SignupForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Routes>
  );
}

export default App;
