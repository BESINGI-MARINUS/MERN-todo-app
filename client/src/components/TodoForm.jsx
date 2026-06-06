function TodoForm() {
  return (
    <>
      <div id="taskModal" className="modal-overlay" style={{ display: "none" }}>
        <div className="modal-card">
          <div className="modal-header">
            <h2>Create New Task</h2>
            <button id="closeModal" className="close-btn">
              &times;
            </button>
          </div>

          <form id="todoForm">
            <div className="form-group">
              <label>Task Title</label>
              <input
                type="text"
                id="taskTitle"
                placeholder="e.g., Submit HND Project"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select id="taskCategory">
                  <option value="school">Academic</option>
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input type="date" id="taskDeadline" required />
              </div>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <div className="priority-selector">
                <label>
                  <input type="radio" name="priority" value="low" /> Low
                </label>
                <label>
                  <input
                    type="radio"
                    name="priority"
                    value="medium"
                    defaultChecked
                  />{" "}
                  Medium
                </label>
                <label>
                  <input type="radio" name="priority" value="high" /> High
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary">
              Create Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TodoForm;
