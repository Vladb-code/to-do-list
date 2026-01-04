import { legacy_createStore, combineReducers } from "redux";
import inputTextReduser from "./reducers/inputTextReducer";
import tasksReduser from "./reducers/tasksReduser";

const store = legacy_createStore(
  combineReducers({
    text: inputTextReduser,
    tasks: tasksReduser,
  })
);
export default store;
