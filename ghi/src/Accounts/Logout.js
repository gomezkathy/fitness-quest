import { useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

export default function Logout() {
  const { logout, token } = useToken();

  useEffect(() => {
    if (token) logout();
  }, [token, logout]);

  return <div>Logged out</div>;
}
