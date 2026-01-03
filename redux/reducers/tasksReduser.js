const initialValue = {
  value: [{ id: crypto.randomUUID(), title: "Купить молоко", isDone: false }],
};

const tasksReduser = (store = initialValue, action) => {
  switch (action.type) {
    case "add":
      return {
        ...store,
        value: [
          ...store.value,
          {
            id: crypto.randomUUID(),
            title: action.payload,
            isDone: false,
          },
        ],
      };
    case "delete":
      return {
        ...store,
        value: store.value.filter((task) => task.id !== action.payload),
      };

    case "edit":
      return {
        ...store,
        value: store.value.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.newTitle }
            : item
        ),
      };
    case "isDoneChecked":
      console.log(action);
      return {
        ...store,
        value: store.value.map((item) =>
          item.id === action.payload ? { ...item, isDone: !item.isDone } : item
        ),
      };

    default:
      return store;
  }
};

export default tasksReduser;
