import { useSelector, useDispatch } from "react-redux";
import { change, zero } from "../redux/inputTextSlice";
import { createTasks } from "../redux/taskSlice";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const InputTask = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((store) => store.text);

  const handleChange = (e) => {
    dispatch(change(e.target.value));
  };

  // const addNewTask = () => {
  //   if (value.trim() !== "") {
  //     dispatch(createTasks(value));
  //   }
  // };

  const handleClick = () => {
    addNewTask();
    dispatch(zero());
  };

  // const handleDouwnEnter = (e) => {
  //   if (e.key === "Enter") {
  //     addNewTask();
  //     dispatch(zero());
  //   }
  // };

  const handleSearch = (taskTitle) => {
    if (taskTitle.trim() !== "") {
      dispatch(createTasks(taskTitle));
      dispatch(zero());
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Input.Search
        size="small"
        placeholder="What is the task today?"
        enterButton={
          <Button type="primary" icon={<PlusOutlined />}>
            Add
          </Button>
        }
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "white",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default InputTask;
