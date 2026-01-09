import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const getSavedUser = () => {
  const user = localStorage.getItem("user");
  if (!user || user === "undefined") return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Неверный email или пароль"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка при регистрации"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!localStorage.getItem("token"),
    user: getSavedUser(),
    loading: false,
    token: localStorage.getItem("token") || null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;

        const userValue =
          action.payload.user?.username || action.payload.user?.email || "User";

        state.user = userValue;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(userValue));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;

        const userValue =
          action.payload.user?.username || action.payload.user?.email || "User";

        state.user = userValue;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(userValue));
        alert("Аккаунт успешно создан!");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
