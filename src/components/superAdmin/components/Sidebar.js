import React from "react";
import "./styles/sidebar.css";
import logoimage from "../../assests/image/logoimage.png";
import david from "../../assests/image/david.png";

const Sidebar = () => {
  return (
    <>
      <div>
        <input type="checkbox" id="check" />
        <div className="sidebar">
          <center className="images_sidebar">
            <label htmlFor="check">
              <i className="fas fa-chevron-left" id="sidebar_btn" />
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

export default Sidebar;
