export default function TodoSection({ heading, btnAddTask, children }) {
  return (
    <section className="todo-section">
      <div className="section-header">
        <h1>{heading}</h1>
        {btnAddTask && (
          <button className="btn-add">
            <i className="fa fa-plus"></i> New Task
          </button>
        )}
      </div>

      {children}
    </section>
  );
}
