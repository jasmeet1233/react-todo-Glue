import React, { useState, useRef } from "react";
import { FaCheck } from "react-icons/fa";
// import FaCheck from 'react-icons'

const TodoItem = ({ status, id, todo, deleteTodo, toggleStatus }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="todo-item"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {/* <input type="checkbox" onClick={() => toggleStatus(id)} /> */}
      <div className="check-box" onClick={() => toggleStatus(id)}>
        <div className={status === "complete" ? "show-check" : "check"}>
          <FaCheck size={15} />
        </div>
      </div>
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
