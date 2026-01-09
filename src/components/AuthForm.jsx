import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Typography,
  Alert,
} from "antd";

const { Title, Text } = Typography;
const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form] = Form.useForm();
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   gender: "male",
  //   age: "",
  // });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { isLoggedIn, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  const onFinish = (values) => {
    if (isRegister) {
      dispatch(registerUser(formData));
    } else {
      // dispatch(
      //   loginUser({ email: formData.email, password: formData.password })
      //);
      dispatch(loginUser({ email: values.email, password: values.password }));
    }
  };

  //   return (
  //     <div className="auth-container">
  //       <form className="auth-form" onSubmit={handleSubmit}>
  //         <h2>{isRegister ? "Создать аккаунт" : "Вход в систему"}</h2>

  //         {error && <p>{error}</p>}

  //         <input
  //           type="email"
  //           placeholder="E-mail"
  //           required
  //           value={formData.email}
  //           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  //         />

  //         <input
  //           type="password"
  //           placeholder="Пароль"
  //           required
  //           value={formData.password}
  //           onChange={(e) =>
  //             setFormData({ ...formData, password: e.target.value })
  //           }
  //         />

  //         {isRegister && (
  //           <>
  //             <input
  //               type="text"
  //               placeholder="Имя пользователя"
  //               required
  //               value={formData.username}
  //               onChange={(e) =>
  //                 setFormData({ ...formData, username: e.target.value })
  //               }
  //             />
  //             <select
  //               value={formData.gender}
  //               onChange={(e) =>
  //                 setFormData({ ...formData, gender: e.target.value })
  //               }
  //             >
  //               <option value="male">Мужской</option>
  //               <option value="female">Женский</option>
  //             </select>
  //             <input
  //               type="number"
  //               placeholder="Возраст"
  //               required
  //               value={formData.age}
  //               onChange={(e) =>
  //                 setFormData({ ...formData, age: e.target.value })
  //               }
  //             />
  //           </>
  //         )}

  //         <button type="submit" disabled={loading}>
  //           {loading
  //             ? "Обработка..."
  //             : isRegister
  //             ? "Зарегистрироваться"
  //             : "Войти"}
  //         </button>

  //         <p
  //           onClick={() => setIsRegister(!isRegister)}
  //           style={{ cursor: "pointer", marginTop: "15px", textAlign: "center" }}
  //         >
  //           {isRegister
  //             ? "Уже есть профиль? Войти"
  //             : "Нет аккаунта? Зарегистрироваться"}
  //         </p>
  //       </form>
  //     </div>
  //   );
  // };
  return (
    <div className="glass-card" style={{ maxWidth: 400, margin: "50px auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        {isRegister ? "Создать аккаунт" : "Вход в систему"}
      </Title>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}

      <Form
        form={form}
        name="auth_form"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ gender: "male" }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Введите корректный E-mail!",
            },
          ]}
        >
          <Input placeholder="E-mail" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              min: 6,
              message: "Пароль должен быть не менее 6 символов!",
            },
          ]}
        >
          <Input.Password placeholder="Пароль" size="large" />
        </Form.Item>

        {isRegister && (
          <>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Введите имя пользователя!" }]}
            >
              <Input placeholder="Имя пользователя" size="large" />
            </Form.Item>

            <Form.Item name="gender" label="Пол">
              <Select size="large">
                <Select.Option value="male">Мужской</Select.Option>
                <Select.Option value="female">Женский</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="age"
              rules={[{ required: true, message: "Укажите возраст!" }]}
            >
              <InputNumber
                placeholder="Возраст"
                style={{ width: "100%" }}
                size="large"
                min={1}
              />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          <Text
            onClick={() => {
              setIsRegister(!isRegister);
              form.resetFields();
            }}
            style={{ cursor: "pointer", color: "#1677ff" }}
          >
            {isRegister
              ? "Уже есть профиль? Войти"
              : "Нет аккаунта? Зарегистрироваться"}
          </Text>
        </div>
      </Form>
    </div>
  );
};
export default AuthForm;
