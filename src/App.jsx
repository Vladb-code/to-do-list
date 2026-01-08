import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import AuthForm from "./AuthForm";
import { logout } from "./redux/authSlice";
import "./App.css";

const App = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="todo-app">
      {!isLoggedIn ? (
        <AuthForm />
      ) : (
        <div className="box">
          <div className="user-info">
            <span>Привет, {user}!</span>
            <button onClick={() => dispatch(logout())}>Выйти</button>
          </div>
          <Header />
          <InputTask />
          <ToDoList />
        </div>
      )}
    </div>
  );
};

export default App;
