import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import "./App.css";

const App = () => {
  return (
    <div className="todo-app">
      <div className="box">
        <Header />
        <InputTask />
        <ToDoList />
      </div>
    </div>
  );
};

export default App;
