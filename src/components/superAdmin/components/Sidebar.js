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
  const [tabName1, setTabName1] = useState("Education");
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

  const dLink1 = (name, url, icon) => {
    return (
      <Link
        className="sidebar_options_link"
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
  const dLink2 = (name, url, icon) => {
    return (
      <Link
        className="dropdown-item  sidebar_options_link"
        to={url}
        onClick={() => {
          setTabName1(name);
        }}
      >
        <img src={icon} className=" Sidebar_text  sidebar_icons" alt="" />
        <span className="text-dark ">{name}</span>
      </Link>
    );
  };
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
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

            {!toggle ? (
              // <>
              <>
                <img src={logoimage} className="profile_image1" alt="" />
                {/* <img src={david} className="profile_image2" alt="" /> */}
              </>
            ) : (
              <>
                {/* <img src={david} className="small_logo_avtar" alt="" /> */}
                <img src={david} className="profile_image2" alt="" />
                <img src={logo} className="small_logo" alt="" />
              </>
            )}
            {/* <h6 className="sidebar_david">David</h6> */}
            {/* {!toggle && (
              <>
                <input
                  className="input_sidebar"
                  type="search"
                  placeholder="search.."
                />
                <span class="fa fa-search errspan"></span>
              </>
            )} */}
            {/* </> */}
          </center>

          {/* ---- first dropdown---- */}
          <div className="flex-shrink-0">
            <ul className="list-unstyled m-0">
              <a
                href="#!"
                className="data-toggle sidebar_options d-flex justify-content-between"
                role="button"
                // data-toggle="collapse"
                id="dropdownMenuLink"
                data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="true"
              >
                <div>
                  <img
                    src={Dashboard_svg}
                    className="  Sidebar_text  sidebar_icons"
                    alt=""
                  />
                  <span className="text-dark ">Dashboard</span>
                </div>
                {!toggle && <i className="fas fa-chevron-down mr-3"></i>}
              </a>

              <div className="collapse " id="dashboard-collapse">
                <ul className="btn-toggle-nav list-unstyled ">
                  <li className="dropdown_items_div ml-3">
                    {dLink1("Fees Stucture", "feesstructuretable", "ok")}
                    {dLink1("My Admin", "admintable", "ok")}

                  </li>
                </ul>
              </div>
            </ul>
          </div>


          {/* ---- second dropdown---- */}
          <div className="flex-shrink-0">
            <ul className="list-unstyled m-0">
              <a
                href="#!"
                className="data-toggle sidebar_options d-flex justify-content-between"
                role="button"
                // data-toggle="collapse"
                id="dropdownMenuLink"
                data-bs-toggle="collapse" data-bs-target="#education-collapse" aria-expanded="true"
              >
                <div>
                  <img
                    src={Education_svg}
                    className="  Sidebar_text  sidebar_icons"
                    alt=""
                  />
                  <span className="text-dark ">Education</span>
                </div>
                {!toggle && <i className="fas fa-chevron-down mr-3"></i>}
              </a>

              <div className="collapse " id="education-collapse">
                <ul className="btn-toggle-nav list-unstyled ">
                  <li className="dropdown_items_div ml-3">
                    {dLink2("Applied Students", "studenttable", "ok")}
                    {dLink2("Students", "", "ok")}
                    {dLink2("Add students", "addnewstudent", "ok")}

                  </li>
                </ul>
              </div>
            </ul>
          </div>

         







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
