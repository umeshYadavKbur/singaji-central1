import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import Dashboard_svg from "../assests/image/sidebarIcons/Dashboard.svg";
import Alumini_svg from "../assests/image/sidebarIcons/Alumini.svg";
import Accounts_svg from "../assests/image/sidebarIcons/Accounts.svg";
import External_company_svg from "../assests/image/sidebarIcons/External_company.svg";
import Donation_svg from "../assests/image/sidebarIcons/Donation.svg";
// import Education_svg from "../assests/image/sidebarIcons/Education.svg";
import Others_svg from "../assests/image/sidebarIcons/Others.svg";

const SidebarLinks = ({ Toggle }) => {
    const [tabName, setTabName] = useState("Dashboard");
    const [tabName1, setTabName1] = useState("Education");



    const remove_active_tab = () => {
        const tags = document.getElementsByClassName('sidebar_options')
        for (let i = 0; i < tags.length; i++) {

            tags.item(i).classList.remove('active_tab');
        }
    }

    const add_active_tab = (id) => {
        console.log(id)
        document.getElementById(id).classList.add('active_tab');

    }
    const dLink1 = (name, url, icon) => {
        return (
            <NavLink
                className="sidebar_options_link"
                to={url}
                onClick={() => {
                    setTabName(name)
                    setTabName1('Education')
                    document.getElementById('dashboard-collapse-btn').click();

                    let x = document.getElementById('education-collapse');
                    if (x.classList.contains('show'))
                        document.getElementById('education-collapse-btn').click();

                    document.getElementById('dashboard-collapse-btn')?.classList.add('active_tab');
                }}
                onClickCapture={remove_active_tab}
            >
                <img src={icon} className=" Sidebar_text sidebar_icons" alt="" />
                <span className="text-dark ">{name}</span>
            </NavLink>
        );
    };
    const dLink2 = (name, url, icon) => {
        return (
            <NavLink
                className="sidebar_options_link"
                to={url}

                onClick={() => {

                    setTabName1(name);
                    setTabName('Dashboard')
                    document.getElementById('education-collapse-btn').click();
                    // 
                    let x = document.getElementById('dashboard-collapse');
                    if (x.classList.contains('show'))
                        document.getElementById('dashboard-collapse-btn').click();

                    document.getElementById('education-collapse-btn')?.classList.add('active_tab');
                }}
                onClickCapture={remove_active_tab}
            >
                <img src={icon} className=" Sidebar_text  sidebar_icons" alt="" />
                <span className="text-dark ">{name}</span>
            </NavLink>
        );
    };

    return (
        <>
            <Link className="sidebar_options" to="#!"
                onClickCapture={remove_active_tab}
                onClick={() => { add_active_tab('Accounts') }}
                id="Accounts"
            >
                <img
                    src={Accounts_svg}
                    className=" Sidebar_text  sidebar_icons"
                    alt=""
                />
                <span className="text-dark ">Accounts</span>
            </Link>

            <Link className="sidebar_options" to="#!"
                onClickCapture={remove_active_tab}
                onClick={() => { add_active_tab('Alumini') }}
                id="Alumini"
            >
                <img
                    src={Alumini_svg}
                    className=" Sidebar_text  sidebar_icons"
                    alt=""
                />
                <span className="text-dark">Alumini</span>
            </Link>
            <Link className="sidebar_options" to="#!"
                onClickCapture={remove_active_tab}
                onClick={() => { add_active_tab('External_Companies') }}
                id='External_Companies'
            >
                <img
                    src={External_company_svg}
                    className=" Sidebar_text  sidebar_icons"
                    alt=""
                />
                <span className="text-dark">External Companies</span>
            </Link>
            <Link className="sidebar_options" to="#!"
                onClickCapture={remove_active_tab}
                onClick={() => { add_active_tab('donation') }}
                id='donation'>
                <img
                    src={Donation_svg}
                    className=" Sidebar_text  sidebar_icons"
                    alt=""
                />
                <span className="text-dark">Donation</span>
            </Link>
            <Link className="sidebar_options" to="#"
                onClickCapture={remove_active_tab}
                onClick={() => { add_active_tab('others') }}
                id='others'>
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