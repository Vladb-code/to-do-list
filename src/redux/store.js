import { configureStore, combineReducers } from "@reduxjs/toolkit";
import inputTextReducer from "./inputTextSlice";
import tasksReducer from "./taskSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: combineReducers({
    text: inputTextReducer,
    tasks: tasksReducer,
    auth: authReducer,
  }),
});

export default store;
