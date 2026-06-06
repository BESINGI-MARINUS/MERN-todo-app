import TodoSection from "./todoSection";

function Upcoming() {
  return (
    <TodoSection heading="Upcoming Tasks">
      <main className="main-content">
        <div className="timeline-container">
          <div className="date-group">
            <h3 className="date-label">Tomorrow - March 22, 2026</h3>
            <div className="todo-item border-upcoming">
              <input type="checkbox" />
              <div className="todo-info">
                <h3>Defense Rehearsal</h3>
                <span className="tag school">HND Project</span>
              </div>
              <span className="time-tag">10:00 AM</span>
            </div>
          </div>

          <div className="date-group">
            <h3 className="date-label">Next Week</h3>
            <div className="todo-item border-upcoming">
              <input type="checkbox" />
              <div className="todo-info">
                <h3>Final Documentation Submission</h3>
                <span className="tag school">Academic</span>
              </div>
              <span className="time-tag">March 28</span>
            </div>
          </div>
        </div>
      </main>
    </TodoSection>
  );
}

export default Upcoming;
