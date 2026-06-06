function SideNav({ activeTab, onSetActiveTab }) {
  return (
    <nav className="sidebar">
      <div className="logo">
        <i className="fa fa-check-double"></i> <span>Task Scheduler</span>
      </div>
      <ul className="nav-links">
        <Tab
          icon="fa fa-home"
          text="Dashboard"
          num={0}
          onClick={onSetActiveTab}
          active={activeTab === 0}
        />
        <Tab
          icon="fa fa-calendar"
          text="Upcoming"
          num={1}
          onClick={onSetActiveTab}
          active={activeTab === 1}
        />
        <Tab
          icon="fa fa-star"
          text="Important"
          num={2}
          onClick={onSetActiveTab}
          active={activeTab === 2}
        />
        <Tab
          icon="fa fa-cog"
          text="Settings"
          num={3}
          onClick={onSetActiveTab}
          active={activeTab === 3}
        />
      </ul>
    </nav>
  );
}

function Tab({ icon, text, num, onClick, active }) {
  return (
    <li className={active ? "active" : ""} onClick={() => onClick(num)}>
      <i className={icon}></i> {text}
    </li>
  );
}

export default SideNav;
