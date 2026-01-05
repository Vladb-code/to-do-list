import { configureStore, combineReducers } from "@reduxjs/toolkit";
import inputTextReduser from "./inputTextSlice";

import tasksReduser from "./taskSliсe";

const store = configureStore({
  reducer: combineReducers({
    text: inputTextReduser,
    tasks: tasksReduser,
  }),
});
export default store;
