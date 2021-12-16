import React, { useState } from "react";
import "./styles/sidebar.css";
import logoimage from "../../assests/image/logoimage.png";
import david from "../../assests/image/david.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  hideSideBar,
  showSideBar,
} from "../../../redux/actionDispatcher/showSideBarDispather";
import back_btn from "../../assests/image/back_btn.svg";

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
        <div className="sidebar">
          <center className="images_sidebar">
            <label htmlFor="check">
              <img
                className="fas fa-chevron-left"
                id="sidebar_btn"
                onClick={handleClick}
                src={back_btn}
                style={{ marginBlockEnd: "6px" }}
                alt="back"
              />
            </label>
            <img src={logoimage} className="profile_image1" alt="" />
            <img src={david} className="profile_image2" alt="" />
            <h6 className="sidebar_david">David</h6>
            <input
              className="input_sidebar"
              type="search"
              placeholder="Search.."

            />
            <span class="fa fa-search errspan"></span>
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
            <i className="fas fa-desktop sidebar-logos" />
            <span className="text-dark">Dashboard</span>
          </Link>
          <Link to="/admindashboard/addstudent">
            <i class="fas fa-graduation-cap  sidebar-logos"></i>
            {/* <span>Education</span> */}
            <span className="text-dark">Add Student</span>
          </Link>
          <a href="#!">
            <i class="fas fa-briefcase  sidebar-logos"></i>
            <span className="text-dark">Accounts</span>
          </a>
          <a href="#!">
            <i class="fas fa-book-open  sidebar-logos"></i>
            <span className="text-dark">Alumini</span>
          </a>
          <a href="#!">
            <i class="far fa-chart-bar  sidebar-logos"></i>
            <span className="text-dark">External Companies</span>
          </a>
          <a href="#!">
            <i class="fas fa-hand-holding-usd  sidebar-logos"></i>
            <span className="text-dark">Donation</span>
          </a>
          <a href="#!">
            <i class="fas fa-plus-square sidebar-logos"></i>
            <span className="text-dark">Others</span>
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
