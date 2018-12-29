import React from "react";
import "./todo-list-item.css";

const TodoListItem = ({ onDelete, onToggleImportant, onToggleDone, item }) => {
  const { name, done, important } = item;
  const styles = {
    color: important ? "steelblue" : "black",
    fontWeight: important ? "bold" : "normal",
    textDecoration: done ? "line-through" : "none",
    fontWaight: important ? "bold" : "normal"
  };
  return (
    <span className="todo-list-item">
      <span
        className="todo-list-item-label"
        style={styles}
        onClick={onToggleDone}
      >
        {name}
      </span>

      <button
        type="button"
        className="btn btn-outline-success btn-sm float-right"
        onClick={onToggleImportant}
      >
        <i className="fa fa-exclamation" />
      </button>

      <button
        type="button"
        className="btn btn-outline-danger btn-sm float-right"
        onClick={onDelete}
      >
        <i className="fa fa-trash-o" />
      </button>
    </span>
  );
};

export default TodoListItem;
