import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";

const baseUrl = process.env.REACT_APP_API_HOST;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
