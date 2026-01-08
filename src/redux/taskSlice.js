import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_URL = import.meta.env.VITE_API_URL;
export const getTasks = createAsyncThunk(
  "todos/getTasks",
  async (state, thunkAPI) => {
    console.log(thunkAPI);
    try {
      const store = thunkAPI.getState();
      const response = await fetch(`${API_URL}/todos?isCompleted=false`, {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
      });
      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createTasks = createAsyncThunk(
  "todos/createTasks",
  async (title, thunkAPI) => {
    try {
      const store = thunkAPI.getState();
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
      });
      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTasks = createAsyncThunk(
  "todos/deleteTasks",
  async (id, thunkAPI) => {
    try {
      const store = thunkAPI.getState();
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
      });
      const data = await response.json();

      return { ...data, id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editTasks = createAsyncThunk(
  "todos/editTasks",
  async ({ id, newTitle }, thunkAPI) => {
    try {
      const store = thunkAPI.getState();
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });
      const data = await response.json();

      return { ...data, id, newTitle };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const isDoneCheckedTasks = createAsyncThunk(
  "todos/isDoneCheckedTasks",
  async (id, thunkAPI) => {
    try {
      const store = thunkAPI.getState();
      const response = await fetch(`${API_URL}/todos/${id}/isCompleted`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
      });
      const data = await response.json();

      return { ...data, id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const taskSliсe = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    add(state, action) {
      state.value.push({
        id: crypto.randomUUID(),
        title: action.payload,
        isDone: false,
      });
    },
    deleteTask(state, action) {
      state.value = state.value.filter((task) => task.id !== action.payload);
    },
    edit(state, action) {
      state.value = state.value.map((item) =>
        item.id === action.payload.id
          ? { ...item, title: action.payload.newTitle }
          : item
      );
    },
    isDoneCheckedTask(state, action) {
      state.value = state.value.map((item) =>
        item.id === action.payload ? { ...item, isDone: !item.isDone } : item
      );
    },
  },
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
            ? { ...item, title: action.payload.newTitle }
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
            ? { ...item, isDone: !item.isDone }
            : item
        );
        state.loading = false;
      })
      .addCase(isDoneCheckedTasks.rejected, (state, action) => {});
  },
});

export const { add, deleteTask, edit, isDoneCheckedTask } = taskSliсe.actions;
export default taskSliсe.reducer;
