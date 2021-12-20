import React, { useState } from "react";
import "./styles/sidebar.css";
import logoimage from "../../assests/image/logoimage.png";
import logo from "../../assests/image/logo.png";
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

const Sidebar = ({ hideSideBar, showSideBar, isPlaying, play }) => {
  const [toggle, setToggle] = useState(false);
  const [tabName, setTabName] = useState("Dashboard");
  const handleClick = () => {
    play(!isPlaying);
    if (toggle) {
      setToggle(false);
      hideSideBar();
    } else {
      setToggle(true);
      showSideBar();
    }
  };
  // function getSelectValue() {
  //   var selectedValue = document.getElementById("list").value;
  //   console.log(selectedValue);
  // }

  const dLink = (name, url, icon) => {
    return (
      <Link
        className="dropdown-item  sidebar_options_link"
        to={url}
        onClick={() => {
          setTabName(name);
        }}
      >
        <img src={icon} className=" Sidebar_text  sidebar_icons" alt="" />
        <span className="text-dark ">{name}</span>
      </Link>
    );
  };

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

            {!toggle ? (
              // <>
              <>
                <img src={logoimage} className="profile_image1" alt="" />
                <img src={david} className="profile_image2" alt="" />
              </>
            ) : (
              <>
                <img src={david} className="small_logo_avtar" alt="" />
                <img src={david} className="profile_image2" alt="" />
                <img src={logo} className="small_logo" alt="" />
              </>
            )}
            <h6 className="sidebar_david">David</h6>
            {!toggle && (
              <>
                <input
                  className="input_sidebar"
                  type="search"
                  placeholder="search.."
                />
                <span className="fa fa-search errspan"></span>
              </>
            )}
            {/* </> */}
          </center>
          <div className="dropdown show">
            <a
              className="data-toggle sidebar_options d-flex justify-content-between"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div>
                <img
                  src={Dashboard_svg}
                  className=" Sidebar_text  sidebar_icons"
                  alt=""
                />
                <span className="text-dark ">{tabName}</span>
              </div>
              {!toggle && <i className="fas fa-chevron-down mr-3"></i>}
            </a>

            {
              <div
                className="dropdown-menu dropdown_items_div "
                aria-labelledby="dropdownMenuLink"
              >
                {tabName !== "Fees Stucture" &&
                  dLink("Fees Stucture", "feesstructuretable", "ok")}
                {tabName !== "Applied Students" &&
                  dLink("Applied Students", "studenttable", "ok")}
                {tabName !== "My Admin" &&
                  dLink("My Admin", "admintable", "ok")}
                {tabName !== "Dashboard" && dLink("Dashboard", "", "ok")}

                {/* {tabName !== 'All Student' && <Link className="dropdown-item  sidebar_options_link" to="#!" onClick={() => { setTabName("All Student") }} >
                <img src={Accounts_svg} className=" Sidebar_text  sidebar_icons" alt="" />
                <span className="text-dark ">All Student</span>
              </Link>}
              {tabName !== 'Fees Stucture' && <Link className="dropdown-item  sidebar_options_link" to="#!" onClick={() => { setTabName("Fees Stucture") }} >
                <img src={Accounts_svg} className=" Sidebar_text  sidebar_icons" alt="" />
                <span className="text-dark ">Fees Stucture</span>
              </Link>}

              {tabName !== 'My Admin' && <Link className="dropdown-item  sidebar_options_link" to="#!" onClick={() => { setTabName("My Admin") }}>
                <img src={Accounts_svg} className=" Sidebar_text  sidebar_icons" alt="" />
                <span className="text-dark ">My Admin</span>
              </Link>}

              {tabName !== 'Dashboard' && <Link className="dropdown-item  sidebar_options_link" to="#!" onClick={() => { setTabName("Dashboard") }}>
                <img src={Accounts_svg} className=" Sidebar_text  sidebar_icons" alt="" />
                <span className="text-dark ">Dashboard</span>
              </Link>} */}
              </div>
            }
          </div>

          <Link className="sidebar_options" to="addstudent">
            <img
              src={Education_svg}
              className=" Sidebar_text  sidebar_icons"
              alt=""
            />
            {/* <span>Education</span> */}
            <span className="text-dark ">Education</span>
            {/* {!toggle && <select className="dropdown_heading" id="list" onchange={getSelectValue}>
              <option className="dropdown_option" value="Eduction">Education</option>
              <option value="Applied_Student">Applied Students</option>
              <option value="Students">Students</option>
              <option value="Add_Student">Add Student</option>

            </select>} */}
          </Link>

          <Link className="sidebar_options" to="#!">
            <img
              src={Accounts_svg}
              className=" Sidebar_text  sidebar_icons"
              alt=""
            />
            <span className="text-dark ">Accounts</span>
          </Link>

          <Link className="sidebar_options" to="#!">
            <img
              src={Alumini_svg}
              className=" Sidebar_text  sidebar_icons"
              alt=""
            />
            <span className="text-dark">Alumini</span>
          </Link>
          <Link className="sidebar_options" to="#!">
            <img
              src={External_company_svg}
              className=" Sidebar_text  sidebar_icons"
              alt=""
            />
            <span className="text-dark">External Companies</span>
          </Link>
          <Link className="sidebar_options" to="#!">
            <img
              src={Donation_svg}
              className=" Sidebar_text  sidebar_icons"
              alt=""
            />
            <span className="text-dark">Donation</span>
          </Link>
          <Link className="sidebar_options" to="#">
            <img
              src={Others_svg}
              className=" Sidebar_text  sidebar_icons"
              alt=""
            />
            <span className="text-dark">Others</span>
          </Link>
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
