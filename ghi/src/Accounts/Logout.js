import { useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

export default function Logout() {
  const { logout, token } = useToken();

  useEffect(() => {
    if (token) logout();
  }, [token]);

  return <div>Logged out</div>;
