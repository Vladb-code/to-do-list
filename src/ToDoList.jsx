import Task from "./Task";
import { useSelector } from "react-redux";

const ToDoList = () => {
  const { value } = useSelector((store) => store.tasks);

  return (
    <div className="tasks-list">
      {value.length === 0 && <h1>пусто</h1>}
      {value.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};

export default ToDoList;
