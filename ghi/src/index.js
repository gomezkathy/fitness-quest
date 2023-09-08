import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import App from "./App";

const baseUrl = process.env.REACT_APP_API_HOST;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider baseUrl={baseUrl}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
