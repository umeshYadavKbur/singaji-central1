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
    const [active_menu, setActiveMenu] = useState({ dashboard: false, education: false, account: false });

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
            {/* ---- first dropdown---- */}
            <div className="flex-shrink-0">
                <ul className="list-unstyled m-0">
                    <a
                        onClick={() => {
                            setActiveMenu((pre) => {

                                return {
                                    ...pre,
                                    dashboard: !active_menu.dashboard
                                }
                            })
                            // document.getElementById('dashboard-collapse-btn').classList.add('active_tab');
                        }}
                        href="#!"
                        style={{ borderBottomRightRadius: `${active_menu.dashboard === true ? '0px' : ''}` }}
                        className={`data-toggle sidebar_options_drop d-flex justify-content-between ${active_tab === 'dashboard-collapse-btn' ? 'active_tab' : ''} ${active_menu.dashboard === true ? 'active_tab' : ''} `}
                        role="button"
                        id="dashboard-collapse-btn"
                        data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="true"
                    >
                        <div>
                            <img
                                src={Dashboard_svg}
                                className="Sidebar_text  sidebar_icons"
                                alt=""
                            />
                            <span className="text-dark ">Dashboard</span>
                        </div>
                        {!Toggle && <i className="fas fa-chevron-down mr-3"></i>}
                    </a>


                    <div className="collapse collapse_superadmin p-0" id="dashboard-collapse">
                        <ul className={`${Toggle ? 'btn-toggle-nav-hide' : 'btn-toggle-nav'}  list-unstyled `}>
                            <li className="dropdown_items_div ml-1">

                                {dLink1("Dashboard", "", "ok", 'Dashboard', 'dashboard-collapse-btn')}
                                {dLink1("Fees Stucture", "feesstructuretable", "ok", 'Fees_Stucture', 'dashboard-collapse-btn')}
                                {dLink1("My Admin", "admintable", "ok", 'My_Admin', 'dashboard-collapse-btn')}

                            </li>
                        </ul>
                    </div>
                </ul>
            </div>


            {/* ---- second dropdown---- */}
            <div className="flex-shrink-0">
                <ul className="list-unstyled m-0">
                    <a
                        onClick={() => { setActiveMenu((pre) => { return { ...pre, education: !active_menu.education } }) }}
                        href="#!"
                        style={{ borderBottomRightRadius: `${active_menu.education === true ? '0px' : ''}` }}
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

                    <div className="collapse collapse_superadmin" id="education-collapse">
                        <ul className={`${Toggle ? 'btn-toggle-nav-hide' : 'btn-toggle-nav'}  list-unstyled `}>
                            <li className="dropdown_items_div ml-1">
                                {dLink1("Applied Students", "studenttable", "ok", "Applied_Students", 'education-collapse-btn')}
                                {dLink1("Students", "students", "ok", "Students", "education-collapse-btn")}
                                {dLink1("Add students", "addnewstudent", "ok", "Add_students", 'education-collapse-btn')}
                            </li>
                        </ul>
                    </div>
                </ul>
            </div>

            {/* ---- third dropdown---- */}
            <div className="flex-shrink-0">
                <ul className="list-unstyled m-0">
                    <a
                        onClick={() => { setActiveMenu((pre) => { return { ...pre, account: !active_menu.account } }) }}
                        href="#!"
                        style={{ borderBottomRightRadius: `${active_menu.account === true ? '0px' : ''}` }}
                        className={`data-toggle sidebar_options_drop d-flex justify-content-between ${active_tab === 'account-collapse-btn' ? 'active_tab' : ''} ${active_menu.account === true ? 'active_tab' : ''} `}
                        role="button"
                        // data-toggle="collapse"
                        id="account-collapse-btn"
                        data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="true"
                    >
                        <div>
                            <img
                                src={Accounts_svg}
                                className="  Sidebar_text  sidebar_icons"
                                alt=""
                            />
                            <span className="text-dark ">Account</span>
                        </div>
                        {!Toggle && <i className="fas fa-chevron-down mr-3"></i>}
                    </a>

                    <div className="collapse collapse_superadmin" id="account-collapse">
                        <ul className={`${Toggle ? 'btn-toggle-nav-hide' : 'btn-toggle-nav'}  list-unstyled `}>
                            <li className="dropdown_items_div ml-1">
                                {dLink1("Student Account", "studentaccounttable", "ok", "Student_account", 'account-collapse-btn')}
                                {dLink1("Pending Scholarship", "pendingscholarship", "ok", "Pending_students", "account-collapse-btn")}
                                {dLink1("Fees Receipt List", "feesreceiptlist", "ok", "Fees_receiptlist", 'account-collapse-btn')}
                            </li>
                        </ul>
                    </div>
                </ul>
            </div>


            {/* Thirt dropdown_items_div
            <Link className={`sidebar_options ${active_tab === 'Accounts' ? 'active_tab' : ''}`}
                to="studentaccounttable"

                id="Accounts"
                onClick={() => { changeTab("Accounts") }}
            >
                <img
                    src={Accounts_svg}
                    className=" Sidebar_text  sidebar_icons"
                    alt=""
                />
                <span className="text-dark ">Accounts</span>
            </Link> */}




            <Link className={`sidebar_options ${active_tab === 'Alumini' ? 'active_tab' : ''}`} to="#!"

                id="Alumini"
                onClick={() => { changeTab("Alumini") }}
            >
                <img
                    src={Alumini_svg}
                    className=" Sidebar_text  sidebar_icons"
                    alt=""
                />
                <span className="text-dark">Alumini</span>
            </Link>
            <Link className={`sidebar_options ${active_tab === 'External_Companies' ? 'active_tab' : ''}`} to="#!"

                id='External_Companies'
                onClick={() => { changeTab("External_Companies") }}
            >
                <img
                    src={External_company_svg}
                    className=" Sidebar_text  sidebar_icons"
                    alt=""
                />
                <span className="text-dark">External Companies</span>
            </Link>
            <Link className={`sidebar_options ${active_tab === 'donation' ? 'active_tab' : ''}`} to="#!"

                id='donation'
                onClick={() => { changeTab("donation") }}
            >
                <img
                    src={Donation_svg}
                    className=" Sidebar_text  sidebar_icons"
                    alt=""
                />
                <span className="text-dark">Donation</span>
            </Link>
            <Link className={`sidebar_options ${active_tab === 'others' ? 'active_tab' : ''}`} to="#"

                id='others'
                onClick={() => { changeTab("others") }}
            >
                <img
                    src={Others_svg}
                    className=" Sidebar_text  sidebar_icons"
                    alt=""
                />
                <span className="text-dark">Others</span>
            </Link>
        </>
    );
};

export default SidebarLinks;