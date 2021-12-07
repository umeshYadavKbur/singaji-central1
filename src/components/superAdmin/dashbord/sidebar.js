import React from 'react'
import "/idebar.css";

function Sidebar() {
  return (
    <>

      <div className="sidebar" >
        {/* logo content */}
        <div className="profile_content">
          <img src="logo.png" className="clg_logo" />
          <div className="profile">
            <div className="profile_detail">
              <img src="Mask Group 39.png" className="logo_img" />
              <div className="name_job">
                <div className="name">david</div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- linksss --> */}
        <div className="logo_content">

          <i className="bx bx-menu" id="btn"></i>
        </div>
        <ul className="nav_list">
          {/* <!-- <li>
           <a href="#"> --> */}

          <input type="text" placeholder="Search.." />
          {/* <!-- </a>
         </li> --> */}
          <li>
            <a href="#" >

              {/* <!-- <span className="links_name">Dashboard</span> --> */}
              <i className='bx bx-grid-alt logos'></i>

              <select name="Student" className=" fields form-select links_name" id="inputGroupSelect03" >
                <option selected>Add Student</option>
                <option value="1">Applied Student</option>
                <option value="1">Registered student</option>
                <option value="1">Real student</option>

              </select>
            </a>
            {/* <!-- <span className="tooltip">dashboard</span> --> */}
          </li>
          <li>
            <a href="#">
              <i className="fas fa-graduation-cap logos"></i>
              {/* <!-- <span className="links_name">Education</span> --> */}
              <select name="Education" className=" fields form-select links_name" id="inputGroupSelect03" >
                <option selected>Education</option>
              </select>
            </a>
            {/* <!-- <span className="tooltip">dashboard</span> --> */}
          </li>
          <li>
            <a href="#">
              <i className="fas fa-briefcase logos"></i>
              {/* <!-- <span className="links_name">Alumini</span> --> */}
              <select name="Student" className=" fields form-select links_name" id="inputGroupSelect03" >
                <option selected>Alumini</option>
              </select>
            </a>
            {/* <!-- <span className="tooltip">dashboard</span> --> */}
          </li>
          <li>
            <a href="#">
              <i className="fas fa-chart-bar logos"></i>
              {/* <!-- <span className="links_name">external company</span> --> */}
              <select name="Student" className=" fields form-select links_name" id="inputGroupSelect03" >
                <option selected>External Company</option>
              </select>
            </a>
            {/* <!-- <span className="tooltip">dashboard</span> --> */}
          </li>
          <li>
            <a href="#">
              <i className="fas fa-hand-holding-usd logos"></i>
              {/* <!-- <span className="links_name">Donation</span> --> */}
              <select name="Student" className=" fields form-select links_name" id="inputGroupSelect03" >
                <option selected>Donation</option>
              </select>
            </a>
            {/* <!-- <span className="tooltip">dashboard</span> --> */}
          </li>
          <li>
            <a href="#">
              <i className="fas fa-plus-square logos"></i>
              <span className="links_name">others</span>
            </a>
            {/* <!-- <span className="tooltip">dashboard</span> --> */}
          </li>
        </ul>


      </div>


    </>
  )
}

export default Sidebar;
