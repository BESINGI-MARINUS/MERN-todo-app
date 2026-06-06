import TodoSection from "./todoSection";

function Important() {
  return (
    <TodoSection heading="Important Tasks">
      <main className="main-content">
        <div className="todo-list">
          <div className="todo-item high-priority">
            <i className="fa fa-star" style={{ color: "#f1c40f" }} />
            <div className="todo-info">
              <h3>Pay Semester Installment</h3>
              <span className="tag work">Finance</span>
              <small>Deadline: March 25</small>
            </div>
            <button className="btn-action">Urgent</button>
          </div>

          <div className="todo-item high-priority">
            <i className="fa fa-star" style={{ color: "#f1c40f" }} />
            <div className="todo-info">
              <h3>Submit Internship Logbook</h3>
              <span className="tag school">Academic</span>
            </div>
            <button className="btn-action">High</button>
          </div>
        </div>
      </main>
    </TodoSection>
  );
}

export default Important;
