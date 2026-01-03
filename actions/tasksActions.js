export const createAddTaskAction = (value) => ({ type: "add", payload: value });
export const createDeleteTaskAction = (id) => ({ type: "delete", payload: id });
export const createEditTaskAction = (id, newTitle) => ({
  type: "edit",
  payload: { id, newTitle },
});
export const createIsDoneCheckedAction = (id) => ({
  type: "isDoneChecked",
  payload: id,
});
