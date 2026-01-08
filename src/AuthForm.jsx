import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "./redux/authSlice";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "male",
    age: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(registerUser(formData));
    } else {
      dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isRegister ? "Создать аккаунт" : "Вход в систему"}</h2>

        {error && (
          <p style={{ color: "#ff6b6b", fontSize: "0.8rem" }}>{error}</p>
        )}

        <input
          type="email"
          placeholder="E-mail"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Пароль"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {isRegister && (
          <>
            <input
              type="text"
              placeholder="Имя пользователя"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
            <input
              type="number"
              placeholder="Возраст"
              required
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
            />
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? "Обработка..."
            : isRegister
            ? "Зарегистрироваться"
            : "Войти"}
        </button>

        <p
          onClick={() => setIsRegister(!isRegister)}
          style={{ cursor: "pointer", marginTop: "15px", textAlign: "center" }}
        >
          {isRegister
            ? "Уже есть профиль? Войти"
            : "Нет аккаунта? Зарегистрироваться"}
        </p>
      </form>
    </div>
  );
};
export default AuthForm;
