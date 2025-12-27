import { useState, useContext, memo } from "react";
import { TaskContext } from "./TaskContext";

const InputTask = memo(() => {
  const [text, setText] = useState("");
  const { addTask } = useContext(TaskContext);

  const handleClick = () => {
    if (text.trim()) {
      addTask(text.trim());
      setText("");
    }
  };

  return (
    <div className="input-block">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст задачи..."
      />
      <button onClick={handleClick}>Добавить</button>
    </div>
  );
});

export default InputTask;
