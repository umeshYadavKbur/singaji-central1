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
    const [active_dropdown, setActiveDropdown] = useState('');
    const [active_tab, setActiveTab] = useState('');

    const changeTab = (id) => {

        setActiveDropdown('');
        setActiveTab(id);
        let arr = document.getElementsByClassName('collapse_superadmin');
        console.log(arr);
        // arr.forEach((element) => {
        //     // element.classList.remove('show')
        //     console.log(element)
        // })

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

                            document.getElementById('dashboard-collapse-btn').classList.add('active_tab');
                        }}
                        href="#!"
                        className={`data-toggle sidebar_options_drop d-flex justify-content-between ${active_tab === 'dashboard-collapse-btn' ? 'active_tab' : ''} `}
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
                        <ul className="btn-toggle-nav list-unstyled ">
                            <li className="dropdown_items_div ml-1">

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
                        // onClick={() => {

                        //     document.getElementById('education-collapse-btn').classList.toggle('active_tab');
                        // }}
                        href="#!"
                        className={`data-toggle sidebar_options_drop d-flex justify-content-between ${active_tab === 'education-collapse-btn' ? 'active_tab' : ''} `}
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
            <Link className={`sidebar_options ${active_tab === 'Accounts' ? 'active_tab' : ''}`} to="#!"

                id="Accounts"
                onClick={() => { changeTab("Accounts") }}
            >
                <img
                    src={Accounts_svg}
                    className=" Sidebar_text  sidebar_icons"
                    alt=""
                />
                <span className="text-dark ">Accounts</span>
            </Link>

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