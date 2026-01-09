import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import InputTask from "./components/InputTask";
import ToDoList from "./components/ToDoList";
import AuthForm from "./components/AuthForm";
import { logout } from "./redux/authSlice";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

const App = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="todo-app">
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <AuthForm /> : <Navigate to="/" />}
        />

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <div className="box">
                <div className="user-info"></div>
                <Header />
                <InputTask />
                <ToDoList />
                <button onClick={handleLogout}>log out</button>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
