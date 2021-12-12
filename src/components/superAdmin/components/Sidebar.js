import React, { useState } from "react";
import "./styles/sidebar.css";
import logoimage from "../../assests/image/logoimage.png";
import david from "../../assests/image/david.png";
import { connect } from "react-redux";
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
              placeholder="search.."
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
          <a href="#!">
            <i className="fas fa-desktop" />
            <span>Dashboard</span>
          </a>
          <a href="#!">
            <i className="fas fa-cogs" />
            <span>Components</span>
          </a>
          <a href="#!">
            <i className="fas fa-table" />
            <span>Tables</span>
          </a>
          <a href="#!">
            <i className="fas fa-th" />
            <span>Forms</span>
          </a>
          <a href="#!">
            <i className="fas fa-info-circle" />
            <span>About</span>
          </a>
          <a href="#!">
            <i className="fas fa-sliders-h" />
            <span>Settings</span>
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
