import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import Dashboard_svg from "../assests/image/sidebarIcons/Dashboard.svg";
import Alumini_svg from "../assests/image/sidebarIcons/Alumini.svg";
import Accounts_svg from "../assests/image/sidebarIcons/Accounts.svg";
import External_company_svg from "../assests/image/sidebarIcons/External_company.svg";
import Donation_svg from "../assests/image/sidebarIcons/Donation.svg";
import Education_svg from "../assests/image/sidebarIcons/Education.svg";
import Others_svg from "../assests/image/sidebarIcons/Others.svg";

const SidebarLinks = ({ Toggle }) => {
    const [active_dropdown, setActiveDropdown] = useState('Dashboard');
    const [active_tab, setActiveTab] = useState('dashboard-collapse-btn');
    const [active_menu, setActiveMenu] = useState({ dashboard: false, education: false });

    const changeTab = (id) => {

        setActiveDropdown('');
        setActiveTab(id);
        // setActiveMenu({})

    }

    const dLink1 = (name, url, icon, id, parentId) => {
        return (
            <NavLink

                to={url}
                id={id}
                className={`sidebar_options_link ${active_dropdown === id ? "sidebar_options_active" : ""}`}
                onClick={() => { setActiveDropdown(id); setActiveTab(parentId) }}
            >
                <img src={icon} className=" Sidebar_text sidebar_icons" alt="" />
                <span className="text-dark ">{name}</span>
            </NavLink>
        );
    };

    return (
        <>


            {/* ---- second dropdown---- */}
            <div className="flex-shrink-0">
                <ul className="list-unstyled m-0">
                    <a
                        onClick={() => { setActiveMenu((pre) => { return { ...pre, education: !active_menu.education } }) }}
                        href="#!"
                        className={`data-toggle sidebar_options_drop d-flex justify-content-between ${active_tab === 'education-collapse-btn' ? 'active_tab' : ''} ${active_menu.education === true ? 'active_tab' : ''} `}
                        role="button"
                        // data-toggle="collapse"
                        id="education-collapse-btn"
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
                        {!Toggle && <i className="fas fa-chevron-down mr-3"></i>}
                    </a>

                    <div className="collapse collapse_superadmin py-2" id="education-collapse">
                        <ul className="btn-toggle-nav list-unstyled ">
                            <li className="dropdown_items_div ml-1">
                                {dLink1("Applied Students", "studenttable", "ok", "Applied_Students", 'education-collapse-btn')}
                                {dLink1("Students", "", "ok", "Students")}
                                {dLink1("Add students", "addnewstudent", "ok", "Add_students", 'education-collapse-btn')}
                            </li>
                        </ul>
                    </div>
                </ul>
            </div>

        </>
    );
};

export default SidebarLinks;