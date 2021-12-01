import { useState, useMemo } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [todo, setTodo] = useState([]);
  const [filter, setFilter] = useState("all");

  const addHandler = (e) => {
    e.preventDefault();
    if (inputText) {
      const todoObj = {
        todo: inputText,
        id: new Date().getTime().toString(),
        status: "incomplete",
      };
      setTodo([...todo, todoObj]);
      setInputText("");
    }
  };

  const deleteTodo = (id) => {
    const updatedArr = todo.filter((item) => item.id !== id);
    setTodo(updatedArr);
  };

  const items = useMemo(() => {
    if (filter === "all") {
      return todo;
    } else if (filter === "active") {
      const updatedArr = todo.filter((item) => item.status === "incomplete");
      return updatedArr;
    } else if (filter === "completed") {
      const updatedArr = todo.filter((item) => item.status === "complete");
      return updatedArr;
    }
    return todo;
  }, [filter, todo]);

  const toggleStatus = (id) => {
    const updatedArr = todo.map((item) => {
      if (item.id === id) {
        return item.status === "complete"
          ? { ...item, status: "incomplete" }
          : { ...item, status: "complete" };
      } else {
        return { ...item };
      }
    });
    setTodo(updatedArr);
  };

  const deleteCompleted = () => {
    const updatedArr = todo.filter((item) => item.status === "incomplete");
    setTodo(updatedArr);
  };

  return (
    <div className="App">
      <form onSubmit={addHandler}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </form>
      <div>
        {items.map((item) => {
          const { id, todo, status } = item;
          return (
            <div className="todo-item" key={id}>
              <button onClick={() => toggleStatus(id)}>
                {status === "complete" ? "C" : "NC"}
              </button>
              <p>{todo}</p>
              <button onClick={() => deleteTodo(id)}>X</button>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={deleteCompleted}>Clear Completed</button>
      </div>
    </div>
  );
}

export default App;
