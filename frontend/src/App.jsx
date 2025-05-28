import { useThemeStore } from "./store/useThemeStore";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LayOut from "./Components/LayOut";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivetRoute from "./privetRoute/PrivetRoute";
import MyStudents from "./pages/MyStudents";
import AddStudent from "./pages/AddStudent";

import { useAuth } from "./AuthContext/AuthContext";
import LoginPage from "./pages/Login";
import DetailsOFStudent from "./pages/DetailsOfStudent";
import Profile from "./Components/Profile";
const App = () => {
  const { theme } = useThemeStore();
  const { auth } = useAuth();
  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route path="/" element={<PrivetRoute />}>
          <Route
            path="/"
            element={
              auth.token ? (
                <LayOut showSidebar={true}>
                  <HomePage />
                </LayOut>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="my-student"
            element={
              <LayOut showSidebar={true}>
                <MyStudents />
              </LayOut>
            }
          />
          <Route
            path="add-Student"
            element={
              <LayOut showSidebar={true}>
                <AddStudent />
              </LayOut>
            }
          />

          <Route
            path="profile/:id"
            element={
              <LayOut showSidebar={true}>
                <Profile />
              </LayOut>
            }
          />

          <Route
            path="details/:id"
            element={
              <LayOut showSidebar={true}>
                <DetailsOFStudent />
              </LayOut>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
