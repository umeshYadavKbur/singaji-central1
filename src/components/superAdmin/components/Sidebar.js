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
  return (
    <>
      <div>
        <input type="checkbox" id="check" />
        <div className="sidebar toggle_animation">
          <center className="images_sidebar toggle_animation">
            <label htmlFor="check">

              <img
                className="fas fa-chevron-left"
                id="sidebar_btn"
                onClick={handleClick}
                src={!toggle? back_btn:toggle_btn_icon}
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
          <Link to="/admindashboard">
            <i className="fas fa-desktop" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admindashboard/addstudent">
            <i class="fas fa-graduation-cap"></i>
            {/* <span>Education</span> */}
            <span>Add Student</span>
          </Link>
          <a href="#!">
            <i class="fas fa-briefcase"></i>
            <span>Accounts</span>
          </a>
          <a href="#!">
            <i class="fas fa-book-open"></i>
            <span>Alumini</span>
          </a>
          <a href="#!">
            <i class="far fa-chart-bar"></i>
            <span>External Companies</span>
          </a>
          <a href="#!">
            <i class="fas fa-hand-holding-usd"></i>
            <span>Donation</span>
          </a>
          <a href="#!">
            <i class="fas fa-plus-square"></i>
            <span>Others</span>
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
