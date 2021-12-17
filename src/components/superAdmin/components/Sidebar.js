import React, { useState } from "react";
import "./styles/sidebar.css";
import logoimage from "../../assests/image/logoimage.png";
import logo from '../../assests/image/logo.png'
import david from "../../assests/image/david.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  hideSideBar,
  showSideBar,
} from "../../../redux/actionDispatcher/showSideBarDispather";
import back_btn from "../../assests/image/sidebarIcons/back_btn.svg";
import toggle_btn_icon from "../../assests/image/sidebarIcons/toggle_btn_sidebar.png";
import Dashboard_svg from "../../assests/image/sidebarIcons/Dashboard.svg";
import Alumini_svg from "../../assests/image/sidebarIcons/Alumini.svg";
import Accounts_svg from "../../assests/image/sidebarIcons/Accounts.svg";
import External_company_svg from "../../assests/image/sidebarIcons/External_company.svg";
import Donation_svg from "../../assests/image/sidebarIcons/Donation.svg";
import Education_svg from "../../assests/image/sidebarIcons/Education.svg";
import Others_svg from "../../assests/image/sidebarIcons/Others.svg";

const Sidebar = ({ hideSideBar, showSideBar }) => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    if (toggle) {
      setToggle(false);
      hideSideBar();
    } else {
      setToggle(true);
      showSideBar();
    }
  };
  function getSelectValue() {
    var selectedValue = document.getElementById("list").value;
    console.log(selectedValue);
  }
  // getSelectValue();
  return (
    <>
      <div id="sidebar">
        <input type="checkbox" id="check" />
        <div className="sidebar toggle_animation">
          <center className="images_sidebar toggle_animation">
            <label htmlFor="check">

              <img
                className="fas fa-chevron-left"
                id="sidebar_btn"
                onClick={handleClick}
                src={!toggle ? back_btn : toggle_btn_icon}
                style={{ marginBlockEnd: "6px" }}
                alt="back"
              />
            </label>

            {!toggle ?
              // <>
              <>
                <img src={logoimage} className="profile_image1" alt="" />
                <img src={david} className="profile_image2" alt="" />
              </>
              :
              <>
                <img src={david} className="small_logo_avtar" alt="" />
                <img src={david} className="profile_image2" alt="" />
                <img src={logo} className="small_logo" alt="" />
              </>

            }
            <h6 className="sidebar_david">David</h6>
            {!toggle &&
              <>
                <input
                  className="input_sidebar"
                  type="search"
                  placeholder="search.."
                />
                <span class="fa fa-search errspan"></span>
              </>
            }
            {/* </> */}
          </center>
          {/* <i class="fas fa-columns"></i>
             <span className="link_name">Dashboard</span>
            </a>
            <i class="fas fa-arrow-down arrow"></i>
            </div>
            <ul className="sub-menu">
            <li><a className="link_name" href="#">Dashboard</a></li>
             <li><a href="#">All students</a></li>
             <li><a href="#">My Admin</a></li>
             <li><a href="#">View fees structure</a></li>
             </ul> */}

          <Link className="sidebar_options" to="/admindashboard">
            <img src={Dashboard_svg} className="Sidebar_text sidebar_icons" alt="" />
            {/* <span className="text-dark">Dashboard</span> */}
            {!toggle && <select className="dropdown_heading" id="list" onchange={getSelectValue}>
              <option value="Dashboard">Dashboard</option>
              <option value="All_Students">All Student</option>
              <option value="My_Admin">My Admin</option>
              <option value="Fees_Structure">View Fees Structure</option>

            </select>}
          </Link>
          <Link className="sidebar_options" to="/admindashboard/addstudent">
            <img src={Education_svg} className=" Sidebar_text  sidebar_icons" alt="" />
            {/* <span>Education</span> */}
            {/* <span className="text-dark ">Education</span> */}
            {!toggle && <select className="dropdown_heading" id="list" onchange={getSelectValue}>
              <option className="dropdown_option" value="Eduction">Education</option>
              <option value="Applied_Student">Applied Students</option>
              <option value="Students">Students</option>
              <option value="Add_Student">Add Student</option>

            </select>}
          </Link>

          <href className="sidebar_options" href="#!">
            <img src={Accounts_svg} className=" Sidebar_text  sidebar_icons" alt="" />
            <span className="text-dark ">Accounts</span>
          </href>
          <href className="sidebar_options" href="#!">
            <img src={Alumini_svg} className=" Sidebar_text  sidebar_icons" alt="" />
            <span className="text-dark">Alumini</span>
          </href>
          <href className="sidebar_options" href="#!">
            <img src={External_company_svg} className=" Sidebar_text  sidebar_icons" alt="" />
            <span className="text-dark">External Companies</span>
          </href>
          <href className="sidebar_options" href="#!">
            <img src={Donation_svg} className=" Sidebar_text  sidebar_icons" alt="" />
            <span className="text-dark">Donation</span>
          </href>
          <Link to="/admindashboard/studenttable" className="sidebar_options" href="#!">
            <img src={Others_svg} className=" Sidebar_text  sidebar_icons" alt="" />
            <span className="text-dark">Others</span>
          </Link>
          <a href="#!">

          </a>

        </div>
        <div />
      </div>
    </>
  );
};

//Getting the state from the store

//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = (dispatch) => {
  return {
    showSideBar: () => dispatch(showSideBar()),
    hideSideBar: () => dispatch(hideSideBar()),
  };
};

//Connecting the component to our store
export default connect(null, mapDispatchToProps)(Sidebar);
