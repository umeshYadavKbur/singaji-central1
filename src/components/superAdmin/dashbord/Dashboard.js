import React from "react";
// import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
// import Table from "../Table";
import "./styles/dashboard.css";
function Dashboard() {
  return (
    <div className="main_container_dashboard">
      <div className="side_bar_content">sidebar content</div>
      <div className="header_table">
        <div className="header_dashboard">
          <Navbar />
        </div>
        <div className="table_dashboard">
          <h1>The table come here</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
