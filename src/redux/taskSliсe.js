import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{ id: crypto.randomUUID(), title: "Купить молоко", isDone: false }],
};

const taskSliсe = createSlice({
  name: "tasks",
  initialState,
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
});

export const { add, deleteTask, edit, isDoneCheckedTask } = taskSliсe.actions;
export default taskSliсe.reducer;
