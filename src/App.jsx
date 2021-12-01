import { useState, useMemo } from "react";
import TodoItem from "./TodoItem";

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
      <h1 className="todos-heading">todos</h1>
      <div className="todo-container">
        <form onSubmit={addHandler}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="what needs to be done?"
            className="todo-input"
          />
        </form>
        <div className="todo-item-container">
          {items.map((item) => {
            const { id, todo, status } = item;
            return <TodoItem {...item} toggleStatus={toggleStatus} deleteTodo = {deleteTodo} key={id} />;
          })}
        </div>
        {todo.length !== 0 && (
          <div className="footer">
            <button onClick={() => setFilter("all")} className="footer-buttons">
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className="footer-buttons"
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className="footer-buttons"
            >
              Completed
            </button>
            <button onClick={deleteCompleted} className="footer-buttons">
              Clear Completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
