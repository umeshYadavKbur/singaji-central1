import React from "react";
import "./styles/Navbar.css";
import AppHeaderDropdown from "./HeaderDropdown";
import CreateAdminPopup from "./CreateAdminPopup";
import FeesStructure from "./FeesStructure";

function Navbar() {
  return (
    <div className="container_navbar">
      <div className="navbar_container_start_side">
        <h3 style={{ color: "#5A607F", marginLeft: "10px" }}>Dashboard</h3>
      </div>
      <div className="navbar_container_end_side">
        <FeesStructure />
        <CreateAdminPopup />
        <AppHeaderDropdown />
      </div>
    </div>
  );
}

export default Navbar;
