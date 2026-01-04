import { useSelector, useDispatch } from "react-redux";
import { createAddTaskAction } from "../actions/tasksActions";

const InputTask = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((store) => store.text);

  const handleChange = (e) => {
    dispatch({ type: "change", payload: e.target.value });
  };

  const addNewTask = () => {
    if (value.trim() !== "") {
      dispatch(createAddTaskAction(value));
    }
  };

  const handleClick = () => {
    addNewTask();
    dispatch({ type: "zero" });
  };

  const handleDouwnEnter = (e) => {
    if (e.key === "Enter") {
      addNewTask();
      dispatch({ type: "zero" });
    }
  };

  return (
    <div className="input-block">
      <input
        className="input-add"
        value={value}
        onChange={handleChange}
        onKeyDown={handleDouwnEnter}
        placeholder="What is the task today?"
      />
      <button className="btn-add" onClick={handleClick}>
        Add task
      </button>
    </div>
  );
};

export default InputTask;
