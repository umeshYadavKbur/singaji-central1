import React from "react";
// import React, { useState } from "react";
import "../styles/Navbar.css";
import logo from "../../../assests/image/Mask Group 39.png";
import back_btn from "../../../assests/image/back_btn.svg";

function Navbar() {
  // const [box, setBox] = useState(false);
  return (
    <div className="container_navbar">
      <div className="navbar_container_start_side">
        <img src={back_btn} style={{ marginBlockEnd: "6px" }} alt="back" />
        <h3 style={{ color: "#5A607F", marginLeft: "10px" }}>Dashboard</h3>
      </div>
      <div className="navbar_container_end_side">
        <img
          src={logo}
          alt="Admin"
          style={{ height: "50px", width: "50px", cursor: "pointer" }}
          // onMouseEnter={() => setBox(true)}
          // onMouseLeave={() => setBox(false)}
        />
      </div>
    </div>
  );
}

export default Navbar;
