import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import Dashboard_svg from "../assests/image/sidebarIcons/Dashboard.svg";
import Alumini_svg from "../assests/image/sidebarIcons/Alumini.svg";
import Accounts_svg from "../assests/image/sidebarIcons/Accounts.svg";
import External_company_svg from "../assests/image/sidebarIcons/External_company.svg";
import Donation_svg from "../assests/image/sidebarIcons/Donation.svg";
// import Education_svg from "../assests/image/sidebarIcons/Education.svg";
import Others_svg from "../assests/image/sidebarIcons/Others.svg";

const SidebarLinks = ({ Toggle }) => {
    // const [active_dropdown, setActiveDropdown] = useState('Dashboard');
    const [active_tab, setActiveTab] = useState('dashboard-collapse-btn');
    // const [active_menu, setActiveMenu] = useState({ dashboard: false, education: false });

    const changeTab = (id) => {

        // setActiveDropdown('');
        setActiveTab(id);
        // setActiveMenu({})

    }

    // const dLink1 = (name, url, icon, id, parentId) => {
    //     return (
    //         <NavLink

    //             to={url}
    //             id={id}
    //             className={`sidebar_options_link ${active_dropdown === id ? "sidebar_options_active" : ""}`}
    //             onClick={() => { setActiveDropdown(id); setActiveTab(parentId) }}
    //         >
    //             <img src={icon} className=" Sidebar_text sidebar_icons" alt="" />
    //             <span className="text-dark ">{name}</span>
    //         </NavLink>
    //     );
    // };

    return (
        <>
     
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