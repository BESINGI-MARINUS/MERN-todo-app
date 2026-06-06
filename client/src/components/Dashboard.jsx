import SideNav from "./SideNav";
import Main from "./main";
import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="dashboard-wrapper">
      <SideNav activeTab={activeTab} onSetActiveTab={setActiveTab} />
      <Main activeTab={activeTab} />
    </div>
  );
}
