import React from "react";
import "../components/styles/Navbar.css";
import AppHeaderDropdown from "../components/HeaderDropdown";
// import CreateAdminPopup from "../components/CreateAdminPopup";
// import FeesStructure from "../components/FeesStructure";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderLink = () => {
    if (localStorage.getItem('userEdit')) {
        var editData = JSON.parse(localStorage.getItem('userEdit'))
    }

    const currentLocation = useLocation().pathname;
    var location = getLocation();

    const navigate = useNavigate();
        // ======== Function to get the location of the current path the it will change the header text according to path ============
    function getLocation() {

        if (currentLocation === "/account_admin_dashboard") {
            return "Dashboard";
        }
        else if (currentLocation === "/account_admin_dashboard/studentaccounttable") {
            return "All Students";
        }
        else if (currentLocation === "/account_admin_dashboard/pendingscholarship") {
            return "Pending Scholarship";
        }
        else if (currentLocation === "/account_admin_dashboard/registeredStudent") {
            return "Registered student";
        }
        else if (currentLocation === "/account_admin_dashboard/feesreceiptlist") {
            return "Fees Receipt List";
        }
        else if (currentLocation === "/account_admin_dashboard/feesstructuretable") {
            return "Fees Structure";
        }
        // ======== for the student profile ! returns student information ==========
        else if (currentLocation.includes('account_admin_dashboard/studentprofile')) {
            if (editData) {
                return (
                    <div className='d-flex flex-column'>
                    <span className="m-0 p-0">{editData.accountInfo.firstName + "  " + editData.accountInfo.lastName} <span className="recieved-fee-circle" style={{ backgroundColor:`${editData.accountInfo.isActive === 'true'?'#56F000':'#f99300'}`  }}></span></span>
                    <span className="" style={{ fontSize: '15px' }}>{`${editData.accountInfo.branch}-${editData.accountInfo.year} (${editData.accountInfo.joinBatch}-${editData.accountInfo.joinBatch + 3})`}</span>
                </div>
                )
            }
            return "Add Student";
        }
        else if (currentLocation === "/account_admin_dashboard/addnewstudent") {
            return "Add New Student";
        }
        else {
            return "Dashboard";
        }
    }

    return (
        <div className="container_navbar">
            <div className="navbar_container_start_side">
                <h3 className=" fw-bolder ml-4" style={{ color: "#5A607F" }}>{location}</h3>
            </div>
            <div className="navbar_container_end_side">
                {location === "Applied Student" && (
                    <div className="changing_navbar_containt_conditional">
                        <button
                            style={{
                                borderWidth: "1px solid #ffc107 ",
                                backgroundColor: "orange",
                                color: "white",
                                border: "none",
                                marginRight: "10px",
                                padding: "5px 15px",
                                fontWeight: "bold",
                                borderRadius: "4px",
                            }}
                            onClick={() => {
                                navigate("addstudent");
                            }}
                        >
                            Add Student <i className="fas fa-plus pl-3"></i>
                        </button>
                    </div>
                )}
                {/* ========= ADMIN PROFILE ============= */}
                <AppHeaderDropdown />
            </div>
        </div>
    );
}

export default HeaderLink;
