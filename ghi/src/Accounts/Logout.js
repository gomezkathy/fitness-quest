import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout, token } = useToken();
  const navigate = useNavigate();
  const handleLogOut = () => {
    if (token) {
      logout();
      navigate("/login");
    }
  };
  return (
    <div>
      <button onClick={handleLogOut} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Logout;
