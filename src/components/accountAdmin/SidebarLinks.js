import React, { useState, useEffect } from 'react';
import {  NavLink, useLocation } from "react-router-dom";
// import Dashboard_svg from "../assests/image/sidebarIcons/Dashboard.svg";
// import Alumini_svg from "../assests/image/sidebarIcons/Alumini.svg";
import Accounts_svg from "../assests/image/sidebarIcons/Accounts.svg";
// import External_company_svg from "../assests/image/sidebarIcons/External_company.svg";
// import Donation_svg from "../assests/image/sidebarIcons/Donation.svg";
// // import Education_svg from "../assests/image/sidebarIcons/Education.svg";
// import Others_svg from "../assests/image/sidebarIcons/Others.svg";

const SidebarLinks = ({ Toggle }) => {
    const [active_dropdown, setActiveDropdown] = useState('Dashboard');
    const [active_tab, setActiveTab] = useState('dashboard-collapse-btn');
    const [active_menu, setActiveMenu] = useState({ dashboard: false, education: false, account: false });

    const currentLocation = useLocation().pathname;
    // var location = getLocation();
    const base = '/account_admin_dashboard'

    // const changeTab = (id) => {

    //     setActiveDropdown('');
    //     setActiveTab(id);
    //     // setActiveMenu({})

    // }

    const DLink1 = (currentLocation, name, url, icon, id, parentId) => {
        useEffect(() => {
            const changeTab1 = () => {


                setActiveDropdown(id);
                setActiveTab(parentId)

                return parentId
            }
            if (currentLocation === (url ? base + '/' + url : base)) {
                console.log(changeTab1())
            }

        }, [currentLocation, id, parentId, url])
        return (
            <NavLink

                to={url}
                id={id}
                className={`sidebar_options_link ${active_dropdown === id ? "sidebar_options_active" : ""}`}
                onClick={(e) => {
                    if (Toggle) {

                        // document.getElementById('dashboard-collapse').classList.remove('show');
                        // document.getElementById('education-collapse').classList.remove('show');
                        document.getElementById('account-collapse').classList.remove('show');
                        setActiveMenu((pre) => {

                            return {
                                dashboard: false,
                                account: false,
                                education: false
                            }
                        })
                    }
                    setActiveDropdown(id);
                    setActiveTab(parentId)
                }}
            >
                <img src={icon} className=" Sidebar_text sidebar_icons" alt="" />
                <span className="text-dark ">{name}</span>
            </NavLink>
        );
    };

    return (
        <>
            {/* ---- third dropdown---- */}
          

            <div className="flex-shrink-0">
                <ul className="list-unstyled m-0">
                    <a
                        onClick={() => { setActiveMenu((pre) => { return { ...pre, account: !active_menu.account } }) }}
                        href="#!"
                        // style={{ borderBottomRightRadius: `${active_menu.account === true ? '0px' : ''}` }}
                        style={Toggle ?
                            !active_menu.account ?
                                { width: '60px', borderBottomRightRadius: `${active_menu.account === true ? '0px' : ''}` }
                                :
                                { borderBottomRightRadius: `${active_menu.account === true ? '0px' : ''}` }
                            : { borderBottomRightRadius: `${active_menu.account === true ? '0px' : ''}` }}
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
                            <span
                                style={
                                    Toggle ?
                                        !active_menu.account ? { display: 'none' } :
                                            {} : {}} className="text-dark ">Account</span>
                        </div>
                        {!Toggle && <i className="fas fa-chevron-down mr-3"></i>}
                    </a>

                    <div className="collapse collapse_superadmin" id="account-collapse">
                        <ul className={`${Toggle ? 'btn-toggle-nav-hide' : 'btn-toggle-nav'}  list-unstyled `}>
                            <li className="dropdown_items_div ml-1">
                                {DLink1(currentLocation, "Student Account", "studentaccounttable", "ok", "Student_account", 'account-collapse-btn')}
                                {DLink1(currentLocation, "Pending Scholarship", "pendingscholarship", "ok", "Pending_students", "account-collapse-btn")}
                                {DLink1(currentLocation, "Fees Receipt List", "feesreceiptlist", "ok", "Fees_receiptlist", 'account-collapse-btn')}
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




        
        </>
    );
};

export default SidebarLinks;