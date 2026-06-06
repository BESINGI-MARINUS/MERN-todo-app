import { useState } from "react";

export default function TodoList() {
  return (
    <div className="todo-list">
      <Todo task="Complete HND Internship Report" category="Academic" />
      <Todo task="Buy MTN Data Bundle" category="Personal" />
    </div>
  );
}

function Todo({ task, category }) {
  const [completed, setCompleted] = useState(false);

  function handleToggleTask() {
    setCompleted((c) => !c);
  }

  return (
    <div className="todo-item">
      <input type="checkbox" onChange={handleToggleTask} />
      <div className="todo-info">
        <h3 className={completed ? "completed" : ""}>{task}</h3>
        <span className="tag school">{category}</span>
      </div>
      <i className="fa fa-ellipsis-v"></i>
    </div>
  );
}
