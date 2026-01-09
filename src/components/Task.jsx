import { useDispatch } from "react-redux";

import { deleteTasks, editTasks, isDoneCheckedTasks } from "../redux/taskSlice";
import { Button, Input, Checkbox, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { useState } from "react";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const saveEdit = () => {
    if (editText.trim()) {
      dispatch(editTasks({ id: task.id, newTitle: editText }));
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
  // const handleDelete = () => {
  //   dispatch(deleteTasks(task.id));
  // };

  // const isDoneChecked = () => {
  //   dispatch(isDoneCheckedTasks(task.id));
  // };
  // return (
  //   <div className="task">
  //     {!isEdit ? (
  //       <p
  //         className={task.isCompleted ? "active" : ""}
  //         onClick={isDoneChecked}
  //         style={{ cursor: "pointer", userSelect: "none" }}
  //       >
  //         {task.title}
  //       </p>
  //     ) : (
  //       <input
  //         className="input-edit"
  //         value={editText}
  //         onChange={(e) => setEditText(e.target.value)}
  //         onKeyDown={handleDouwnEnter}
  //       />
  //     )}
  //     <div className="task-btns">
  //       <button onClick={() => setIsEdit(!isEdit)}>✍︎</button>

  //       <button onClick={handleDelete}>☒</button>
  //     </div>
  //   </div>
  // );
  return (
    <div
      className="task"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <Checkbox
          checked={task.isCompleted}
          onChange={() => dispatch(isDoneCheckedTasks(task.id))}
          style={{ marginRight: "10px" }}
        />

        {!isEdit ? (
          <span
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
              color: task.isCompleted ? "#bfbfbf" : "inherit",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={() => setIsEdit(true)}
          >
            {task.title}
          </span>
        ) : (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleDouwnEnter}
            onBlur={saveEdit}
            autoFocus
            size="small"
          />
        )}
      </div>

      <Space>
        {isEdit ? (
          <Button
            type="primary"
            shape="circle"
            icon={<CheckOutlined />}
            onClick={saveEdit}
            size="small"
          />
        ) : (
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setIsEdit(true)}
          />
        )}
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => dispatch(deleteTasks(task.id))}
        />
      </Space>
    </div>
  );
};

export default Task;
