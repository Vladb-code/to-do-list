import { useContext } from "react";
import { TaskContext } from "./TaskContext";
import Task from "./Task";

const ToDoList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="tasks-list">
      {tasks.length === 0 ? (
        <h1>пусто</h1>
      ) : (
        tasks.map((item) => <Task key={item.id} task={item} />)
      )}
    </div>
  );
};

export default ToDoList;
