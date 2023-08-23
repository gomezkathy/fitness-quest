import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import Cal from "./pages/cal.js";
function App() {
  return (
    <div>
      <Cal />
    </div>
  );
}

export default App;

// app should just have the browser router, import from pages
