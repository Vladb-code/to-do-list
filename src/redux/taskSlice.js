import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const getTasks = createAsyncThunk(
  "todos/getTasks",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    try {
      const token = state.auth.token;
      const response = await api.get(`/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Ошибка при загрузке задач"
      );
    }
  }
);

export const createTasks = createAsyncThunk(
  "todos/createTasks",
  async (title, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const token = state.auth.token;
      const response = await api.post(
        `/todos`,
        { title: title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Ошибка при создании задачи"
      );
    }
  }
);

export const deleteTasks = createAsyncThunk(
  "todos/deleteTasks",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const token = state.auth.token;
      const response = await api.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Ошибка при удалении задачи"
      );
    }
  }
);

export const editTasks = createAsyncThunk(
  "todos/editTasks",
  async ({ id, newTitle }, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const token = state.auth.token;
      const response = await api.patch(
        `/todos/${id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Ошибка при изменении задачи"
      );
    }
  }
);

export const isDoneCheckedTasks = createAsyncThunk(
  "todos/isDoneCheckedTasks",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await api.patch(
        `/todos/${id}/isCompleted`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { ...response.data, id };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Ошибка при обновлении статуса"
      );
    }
  }
);

const taskSliсe = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getTasks.rejected, (state, action) => {});
    builder
      .addCase(createTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createTasks.fulfilled, (state, action) => {
        const { user_id, ...rest } = action.payload;
        state.items.unshift(rest);
        state.loading = false;
      })
      .addCase(createTasks.rejected, (state, action) => {});
    builder
      .addCase(deleteTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteTasks.rejected, (state, action) => {});
    builder
      .addCase(editTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editTasks.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.title }
            : item
        );
        state.loading = false;
      })
      .addCase(editTasks.rejected, (state, action) => {});
    builder
      .addCase(isDoneCheckedTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(isDoneCheckedTasks.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, isCompleted: !item.isCompleted }
            : item
        );
        state.loading = false;
      })
      .addCase(isDoneCheckedTasks.rejected, (state, action) => {});
    builder.addCase(logout, (state) => {
      state.items = [];
      state.loading = false;
    });
  },
});

export const { add, deleteTask, edit, isDoneCheckedTask } = taskSliсe.actions;
export default taskSliсe.reducer;
