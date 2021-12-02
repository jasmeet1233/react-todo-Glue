import React, { useState, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteData } from "./store/todosReducer";
import { toggleStatus } from "./store/todosReducer";

const TodoItem = ({ status, id, todo,  }) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch()

  return (
    <div
      className="todo-item"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div className="check-box" onClick={() => dispatch(toggleStatus(id))}>
        <div className={status === "complete" ? "show-check" : "check"}>
          <FaCheck size={15} />
        </div>
      </div>
      <p className={status === "complete" ? "faded" : ""}>{todo}</p>
      <span
        onClick={() => dispatch(deleteData({id: id}))}
        className={hover ? "delete-button" : "delete-button hideBtn"}
      >
        x
      </span>
    </div>
  );
};

export default TodoItem;
