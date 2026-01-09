import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import InputTask from "./components/InputTask";
import ToDoList from "./components/ToDoList";
import AuthForm from "./components/AuthForm";
import { logout } from "./redux/authSlice";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Card, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import "./App.css";
const { Title } = Typography;

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
    // <div className="todo-app">
    //   <Routes>
    //     <Route
    //       path="/login"
    //       element={!isLoggedIn ? <AuthForm /> : <Navigate to="/" />}
    //     />

    //     <Route
    //       path="/"
    //       element={
    //         isLoggedIn ? (
    //           <div className="box">
    //             <div className="user-info"></div>
    //             <Header />
    //             <InputTask />
    //             <ToDoList />
    //             <button onClick={handleLogout}>log out</button>
    //           </div>
    //         ) : (
    //           <Navigate to="/login" />
    //         )
    //       }
    //     />
    //   </Routes>
    // </div>
    <div
      className="glass-card"
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #001637ff 0%, #c3cfe2 100%)", // фоновый градиент
      }}
    >
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <AuthForm /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Card
                style={{
                  width: 500,
                  backgroundColor: "rgba(10, 209, 244, 0.2)", // Прозрачность
                  backdropFilter: "blur(10px)", // Размытие
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Title level={3} style={{ margin: 0 }}>
                    My Tasks
                  </Title>
                  <Button
                    type="primary"
                    danger
                    ghost
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                  >
                    Выйти
                  </Button>
                </div>

                <Header />
                <InputTask />
                <ToDoList />
              </Card>
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
