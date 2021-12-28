import React, { useState } from "react";
import "./styles/sidebar.css";
import logoimage from "../assests/image/logoimage.png";
import logo from "../assests/image/logo.png";
import david from "../assests/image/david.png";
import { connect } from "react-redux";

import {
  hideSideBar,
  showSideBar,
} from "../../redux/actionDispatcher/superAdmin/showSideBarDispather";
import back_btn from "../assests/image/sidebarIcons/back_btn.svg";
import toggle_btn_icon from "../assests/image/sidebarIcons/toggle_btn_sidebar.png";


const Sidebar = ({ hideSideBar, showSideBar, isPlaying, play, Options }) => {
  const [toggle, setToggle] = useState(false);
 
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
          <main>

            <Options Toggle={toggle} />

          </main>
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
