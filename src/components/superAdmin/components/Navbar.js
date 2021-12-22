import React from "react";
import "./styles/Navbar.css";
import AppHeaderDropdown from "./HeaderDropdown";
import CreateAdminPopup from "./CreateAdminPopup";
import FeesStructure from "./FeesStructure";

function Navbar() {
  return (
    <div className="container_navbar">
      <div className="navbar_container_start_side">
        <h3 className="text-secondary fw-bolder ml-4">Dashboard</h3>
      </div>
      <div className="navbar_container_end_side">
        <div className="changing_navbar_containt_conditional">
          <FeesStructure />
          <CreateAdminPopup />
        </div>
        <AppHeaderDropdown />
      </div>
    </div>
  );
}

export default Navbar;
