import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import "./App.css";

import Workouts from "./pages/Workouts";
import CreateWorkout from "./pages/CreateWorkout";

import Comments from "./pages/Comments";
import CommentForm from "./pages/CreateComment";
import ExerciseForm from "./pages/CreateExercise";
import ExerciseList from "./pages/ExercisesList";
import UpdateExerciseForm from "./pages/UpdateExerciseForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import UpdateComment from "./pages/UpdateComment";

export default function App() {
  return (
    <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
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
              <Route path="create" element={<ExerciseForm />} />
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
