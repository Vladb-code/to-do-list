import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import FilterButtons from "./FilterButtons";
import { TaskProvider } from "./TaskContext";
import "./App.css";
function App() {
  return (
    <div className="app-container">
      <Header />
      <TaskProvider>
        <InputTask />
        <ToDoList />
        <FilterButtons />
      </TaskProvider>
    </div>
  );
}

export default App;
