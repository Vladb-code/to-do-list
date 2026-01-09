import { useEffect } from "react";
import Task from "../components/Task";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../redux/taskSlice";

const ToDoList = () => {
  const dispatch = useDispatch();
  const { items: value, loading } = useSelector((store) => store.tasks);
  console.log(loading);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <>
      {loading ? "loading" : null}
      <div className="tasks-list">
        {value.length === 0 && <h1>пусто</h1>}
        {value.map((item) => (
          <Task key={item.id} task={item} />
        ))}
      </div>
    </>
  );
};

export default ToDoList;
