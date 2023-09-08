import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import "./App.css";
import { useEffect, useState } from "react";
import SignupForm from "./Accounts/SignupForm.js";
import LoginForm from "./Accounts/LoginForm.js";
import Logout from "./Accounts/Logout.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Comments from "./pages/Comments";
import CommentForm from "./pages/CreateComment";
import ExerciseForm from "./pages/CreateExercise";
import ExerciseList from "./pages/ExercisesList";
import UpdateExerciseForm from "./pages/UpdateExerciseForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import UpdateComment from "./pages/UpdateComment";
import Workouts from "./pages/Workouts";
import CreateWorkout from "./pages/CreateWorkout";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  const { token } = useToken();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (token) {
      setUser(JSON.parse(atob(token.split(".")[1])).account);
    }
  }, [token]);

  return (
    <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/accounts">
              <Route path="signup" element={<SignupForm />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="logout" element={<Logout />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/workouts">
              <Route index element={<Workouts />} />
              <Route path="create" element={<CreateWorkout />} />
            </Route>
            <Route path="/comments">
              <Route index element={<Comments />} />
              <Route path=":exerciseId" element={<Comments />} />
              <Route path="create" element={<CommentForm />} />
              <Route
                path="/comments/:exerciseId/:commentId"
                element={<UpdateComment />}
              />
            </Route>
            <Route path="/exercises">
              <Route index element={<ExerciseList />} />
              <Route index element={<ExerciseList />} />
              <Route path="create" element={<ExerciseForm />} />
              <Route
                path="update/:exerciseId"
                element={<UpdateExerciseForm />}
              />
              <Route
                path="update/:exerciseId"
                element={<UpdateExerciseForm />}
              />
            </Route>
          </Routes>
          {<Footer />}
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
