import { useSelector, useDispatch } from "react-redux";
import { change, zero } from "./redux/inputTextSlice";
import { add, createTasks } from "./redux/taskSlice";
const InputTask = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((store) => store.text);

  const handleChange = (e) => {
    dispatch(change(e.target.value));
  };

  const addNewTask = () => {
    if (value.trim() !== "") {
      dispatch(createTasks(value));
    }
  };

  const handleClick = () => {
    addNewTask();
    dispatch(zero());
  };

  const handleDouwnEnter = (e) => {
    if (e.key === "Enter") {
      addNewTask();
      dispatch(zero());
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
