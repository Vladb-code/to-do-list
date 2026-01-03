import { useDispatch } from "react-redux";
import { createDeleteTaskAction } from "../actions/tasksActions";
import { createEditTaskAction } from "../actions/tasksActions";
import { createIsDoneCheckedAction } from "../actions/tasksActions";
import { useState } from "react";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const saveEdit = () => {
    if (editText.trim()) {
      dispatch(createEditTaskAction(task.id, editText));
      setIsEdit(false);
    }
  };
  const handleDouwnEnter = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") {
      setIsEdit(false);
      setEditText(task.title);
    }
  };
  const handleDelete = () => {
    dispatch(createDeleteTaskAction(task.id));
  };

  const isDoneChecked = () => {
    dispatch(createIsDoneCheckedAction(task.id));
  };
  return (
    <div className="task">
      {!isEdit ? (
        <p
          className={task.isDone ? "active" : ""}
          onClick={isDoneChecked}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {task.title}
        </p>
      ) : (
        <input
          className="input-edit"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleDouwnEnter}
        />
      )}
      <div className="task-btns">
        <button onClick={() => setIsEdit(!isEdit)}>✍︎</button>

        <button onClick={handleDelete}>☒</button>
      </div>
    </div>
  );
};

export default Task;
