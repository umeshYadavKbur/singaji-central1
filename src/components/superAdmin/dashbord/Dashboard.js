import React from "react";
// import CreateAdmin from "./components/CreateAdmin";
import Sidebar from "./components/Sidebar";
// import Table from '../Table'
import './styles/dashboard.css'
function Dashboard() {
  return (
    <div className="main_container_dashboard">
      <div className="side_bar_content">
        <Sidebar />
      </div>
      <div className="header_table">
        <div className="header_dashboard">
          {/* <CreateAdmin /> */}
        </div>
        <div className="table_dashboard">
          {/* <Table /> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
