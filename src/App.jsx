import { useState, useMemo, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, addTodo, deleteData } from "./store/todosReducer";
import { deleteAllCompleted } from "./store/todosReducer";

function App() {
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("all");
  const [isAllComplete, setIsAllComplete] = useState("false");
  const [isCompletedExists, setIsCompletedExists] = useState("false");

  const { todo } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  console.log('render')

  useEffect(async () => {
    dispatch(fetchData());
  }, []);

  const addHandler = (e) => {
    e.preventDefault();
    if (inputText) {
      const todoObj = {
        todo: inputText,
        id: new Date().getTime().toString(),
        status: "incomplete",
      };
      dispatch(addTodo(todoObj));
      setInputText("");
    }
  };

  const items = useMemo(() => {
    const updatedArr = todo.filter((item) => item.status === "complete");
    if (updatedArr.length >= 1) {
      setIsCompletedExists(true);
    } else {
      setIsCompletedExists(false)
    }
    if (filter === "all") {
      return todo;
    } else if (filter === "active") {
      const updatedArr = todo.filter((item) => item.status === "incomplete");
      return updatedArr;
    } else if (filter === "completed") {
      const updatedArr = todo.filter((item) => item.status === "complete");
      return updatedArr;
    }
  }, [filter, todo]);

  // const deleteCompleted = () => {
  //   const updatedArr = todo.filter((item) => item.status === "incomplete");
  //   setTodo(updatedArr);
  // };

  const toggleStatusAll = () => {
    if (!isAllComplete) {
      const updatedArr = todo.map((item) => {
        return { ...item, status: "incomplete" };
      });
      setTodo(updatedArr);
      setIsAllComplete(!isAllComplete);
    } else {
      const updatedArr = todo.map((item) => {
        return { ...item, status: "complete" };
      });
      setTodo(updatedArr);
      setIsAllComplete(!isAllComplete);
    }
  };

  return (
    <div className="App">
      <h1 className="todos-heading">todos</h1>
      <div className="todo-container">
        <button className="complete-all" onClick={toggleStatusAll}>
          v
        </button>
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
            return <TodoItem {...item} key={id} />;
          })}
        </div>
        {todo.length !== 0 && (
          <div className="footer">
            <button
              onClick={() => setFilter("all")}
              className={
                filter === "all" ? "footer-buttons active" : "footer-buttons"
              }
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={
                filter === "active" ? "footer-buttons active" : "footer-buttons"
              }
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={
                filter === "completed"
                  ? "footer-buttons active"
                  : "footer-buttons"
              }
            >
              Completed
            </button>
            {isCompletedExists === true && (
              <button onClick={() => dispatch(deleteAllCompleted())} className="footer-buttons clear">
                Clear Completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
