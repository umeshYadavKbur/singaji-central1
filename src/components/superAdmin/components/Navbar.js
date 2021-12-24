import React, { useEffect, useState } from "react";
import "./styles/Navbar.css";
import AppHeaderDropdown from "./HeaderDropdown";
import CreateAdminPopup from "./CreateAdminPopup";
import FeesStructure from "./FeesStructure";
import { useLocation } from "react-router-dom";


function Navbar() {
  const currentLocation = useLocation().pathname;
  var location = getLocation()
  console.log("_____________________________________________________________");
  console.log(location);
  const [show, setShow] = useState(location)


  function getLocation() {

    if (currentLocation === "/admindashboard") {
      return "Dashboard"
    }
    else if (currentLocation === "/admindashboard/feesstructuretable") {
      return "Fees Structure"
    }

    else if (currentLocation === "/admindashboard/studenttable") {
      return "Applied Student"
    }
    else if (currentLocation === "/admindashboard/admintable") {
      return "My Admin"
    } else {
      return "Dashboard"
    }
  }

  return (
    <div className="container_navbar">
      <div className="navbar_container_start_side">
        <h3 className="text-secondary fw-bolder ml-4" >{location}</h3>
      </div>
      <div className="navbar_container_end_side">
        {
          location === "Fees Structure" &&
          (
            <div className="changing_navbar_containt_conditional">
              <FeesStructure />
              <CreateAdminPopup />
            </div>
          )
        }{
          location === "Dashboard" &&
          (
            <div className="changing_navbar_containt_conditional">
              <FeesStructure />
            
              <CreateAdminPopup />
            </div>
          )
        }
        {/* {
          location === "Applied Student"
          (
            <div className="changing_navbar_containt_conditional">
             <button />
            </div>
          )
        } */}
        <AppHeaderDropdown />
      </div>
    </div>
  );
}

export default Navbar;
