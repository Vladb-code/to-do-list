import { useState, memo, useContext } from "react";
import { TaskContext } from "./TaskContext";

const Task = memo(({ task }) => {
  const { deleteTask, toggleTask, editTask } = useContext(TaskContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const saveEdit = () => {
    if (editText.trim() !== "") {
      editTask(task.id, editText.trim());
      setIsEdit(false);
    } else {
      setEditText(task.title);
      setIsEdit(false);
    }
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => toggleTask(task.id)}
      />

      {isEdit ? (
        <input
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
          onBlur={saveEdit}
        />
      ) : (
        <p className={task.isDone ? "active" : ""}>{task.title}</p>
      )}

      <div className="task-btns">
        <button onClick={() => (isEdit ? saveEdit() : setIsEdit(true))}>
          {isEdit ? "↩︎" : "🪄"}
        </button>
        <button onClick={() => deleteTask(task.id)}>🗑️</button>
      </div>
    </div>
  );
});

export default Task;
