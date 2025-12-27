import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : [{ id: 1, title: "-----", isDone: false }];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((title) => {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, isDone: false },
    ]);
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  }, []);

  const editTask = useCallback((id, newTitle) => {
    setTasks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.isDone));
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.isDone);
    if (filter === "completed") return tasks.filter((t) => t.isDone);
    return tasks;
  }, [tasks, filter]);

  const value = {
    tasks: filteredTasks,
    filter,
    setFilter,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    clearCompleted,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
