import TodoList from "./TodoList";
import TodoSection from "./todoSection";
import Important from "./important";
import Upcoming from "./upcoming";
import Setting from "./setting";

export default function Main({ activeTab }) {
  return (
    <main className="main-content">
      <Header />

      {activeTab === 0 && (
        <TodoSection btnAddTask={true} heading="My Tasks">
          <TodoList />
        </TodoSection>
      )}
      {activeTab === 1 && <Upcoming />}
      {activeTab === 2 && <Important />}
      {activeTab === 3 && <Setting />}
    </main>
  );
}

function Header() {
  return (
    <header>
      <div className="search-bar">
        <i className="fa fa-search"></i>
        <input type="text" placeholder="Search tasks..." />
      </div>
      <div className="user-profile">
        <span className="user-name">Mbah Divine</span>
        <img
          src="https://ui-avatars.com/api/?name=Mbah+Divine&background=6c5ce7&color=fff"
          alt="Avatar"
          className="avatar"
        />
      </div>
    </header>
  );
}
