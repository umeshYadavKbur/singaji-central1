import React from "react";
import CreateAdmin from "./components/CreateAdmin";
import Sidebar from "./components/Sidebar";

function Dashboard() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          direction: "column",
          justifyContent: "flex-end",
          margin: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <CreateAdmin />
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
