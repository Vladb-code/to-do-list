import { useContext } from "react";
import { TaskContext } from "./TaskContext";

const FilterButtons = () => {
  const { filter, setFilter, clearCompleted } = useContext(TaskContext);

  return (
    <div className="filter-buttons">
      <button
        onClick={() => setFilter("all")}
        className={filter === "all" ? "btn-active" : ""}
      >
        Все
      </button>
      <button
        onClick={() => setFilter("active")}
        className={filter === "active" ? "btn-active" : ""}
      >
        Активные
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={filter === "completed" ? "btn-active" : ""}
      >
        Готовые
      </button>
      <button onClick={clearCompleted} className="btn-clear">
        Очистить выполненные
      </button>
    </div>
  );
};

export default FilterButtons;
