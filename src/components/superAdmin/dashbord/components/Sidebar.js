import React from "react";
import "../styles/sidebar.css";
import logoName from "../../../assests/image/ssism_si.svg";
// import personImage from "./designn/Person.png";
import personImage from "../../../assests/image/Mask Group 39.png";

function Sidebar() {
  return (
    <>

      <div className="sidebar">
        {/* //logo content */}
        <div className="profile_content">
          <img src={logoName} alt="logo" className="clg_logo" />
          <div className="profile">
            <div className="profile_detail">
              <img src={personImage} alt="personImg" className="logo_img" />
              <div className="name_job">
                <div className="name">david</div>
              </div>
            </div>
          </div>
        </div>
        {/* // linksss */}
        <div className="logo_content">
          <i className="bx bx-menu" id="btn" />
        </div>
        <ul className="nav_list">
          {/* <li>
           <a href="#"> */}
          <input type="text" placeholder="Search.." />
          {/* </a>
         </li> */}
          <li>
            <a href="#">
              {/* <span class="links_name">Dashboard</span> */}
              <i className="bx bx-grid-alt logos" />
              <select name="Student" className=" fields form-select links_name" id="inputGroupSelect03">
                <option selected>Add Student</option>
                <option value={1}>Applied Student</option>
                <option value={1}>Registered student</option>
                <option value={1}>Real student</option>
              </select>
            </a>
            {/* <span class="tooltip">dashboard</span> */}
          </li>
          <li>
            <a href="#">
              <i className="fas fa-graduation-cap logos" />
              {/* <span class="links_name">Education</span> */}
              <select name="Education" className=" fields form-select links_name" id="inputGroupSelect03">
                <option selected>Education</option>
              </select>
            </a>
            {/* <span class="tooltip">dashboard</span> */}
          </li>
          <li>
            <a href="#">
              <i className="fas fa-briefcase logos" />
              {/* <span class="links_name">Alumini</span> */}
              <select name="Student" className=" fields form-select links_name" id="inputGroupSelect03">
                <option selected>Alumini</option>
              </select>
            </a>
            {/* <span class="tooltip">dashboard</span> */}
          </li>
          <li>
            <a href="#">
              <i className="fas fa-chart-bar logos" />
              {/* <span class="links_name">external company</span> */}
              <select name="Student" className=" fields form-select links_name" id="inputGroupSelect03">
                <option selected>External Company</option>
              </select>
            </a>
            {/* <span class="tooltip">dashboard</span> */}
          </li>
          <li>
            <a href="#">
              <i className="fas fa-hand-holding-usd logos" />
              {/* <span class="links_name">Donation</span> */}
              <select name="Student" className=" fields form-select links_name" id="inputGroupSelect03">
                <option selected>Donation</option>
              </select>
            </a>
            {/* <span class="tooltip">dashboard</span> */}
          </li>
          <li>
            <a href="#">
              <i className="fas fa-plus-square logos" />
              <span className="links_name">others</span>
            </a>
            {/* <span class="tooltip">dashboard</span> */}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
