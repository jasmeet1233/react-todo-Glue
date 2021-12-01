import React, { useState, useRef } from "react";

const TodoItem = ({ status, id, todo, deleteTodo, toggleStatus }) => {
  const [hover, setHover] = useState(false);
  const itemRef = useRef();

  return (
    <div
      className="todo-item"
      ref={itemRef}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <input type="checkbox" onClick={() => toggleStatus(id)} />
      <p className={status === "complete" ? "faded" : ""}>{todo}</p>
      <span
        onClick={() => deleteTodo(id)}
        className={hover ? "delete-button" : "delete-button hideBtn"}
      >
        x
      </span>
    </div>
  );
};

export default TodoItem;
