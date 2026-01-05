import { useDispatch } from "react-redux";

import { deleteTask, edit, isDoneCheckedTask } from "./redux/taskSliсe";
import { useState } from "react";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const saveEdit = () => {
    if (editText.trim()) {
      dispatch(edit({ id: task.id, newTitle: editText }));
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
    dispatch(deleteTask(task.id));
  };

  const isDoneChecked = () => {
    dispatch(isDoneCheckedTask(task.id));
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
