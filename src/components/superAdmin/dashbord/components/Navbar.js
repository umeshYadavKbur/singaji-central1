import React from "react";
import "../styles/Navbar.css";
import back_btn from "../../../assests/image/back_btn.svg";
import AppHeaderDropdown from "./HeaderDropdown";

function Navbar() {
  return (
    <div className="container_navbar">
      <div className="navbar_container_start_side">
        <img src={back_btn} style={{ marginBlockEnd: "6px" }} alt="back" />
        <h3 style={{ color: "#5A607F", marginLeft: "10px" }}>Dashboard</h3>
      </div>
      <div className="navbar_container_end_side">
        <AppHeaderDropdown
        />
      </div>
    </div>
  );
}

export default Navbar;
