import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAnimate } from "react-simple-animate";

import "../components/styles/adminDashboard.css";

import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import FeesStructureTable from "../components/FeesStuctureTable";
// import AdminTable from "../components/AdminTable";
import Sidebar from "../components/Sidebar";
// import StudentAccount from "./components/StudentAccount";
import StudentAccountTable from '../components/accounts/StudentAccountTable';
import AddStudent from "../components/AddStudent";
import { ToastContainer } from "react-toastify";
import SidebarLinks from "./SidebarLinks";
import HeaderLink from "./HeaderLink";
import StudentProfile from "../components/accounts/StudentProfile";
import FeesRecipt from "../components/accounts/FeesRecipt";
import UploadDocumentFrom from '../components/accounts/UploadDocumentFrom'
import UpdatePersonalDetialOfStudent from "../components/accounts/UpdatePersonalDetialOfStudent";
import PendingScholarshipTable from './../../redux/reducers/account/pendingScholarshipTable';
import FeesReceiptTable from './../components/accounts/FeesReceiptTable';



function AdminDashboard() {
  const { play, style, isPlaying } = useAnimate({
    start: {
      width: "281px",
      minWidth: "280px",
    },
    end: {
      width: "95px",
      minWidth: "95px",
    },
  });

  return (
    <div className="main_container_dashboard">
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="side_bar_content" style={style}>
        <Sidebar play={play} isPlaying={isPlaying} Options={SidebarLinks} />
      </div>
      <div className="header_table">
        <div className="header_dashboard">
          <Navbar Options={HeaderLink} />
        </div>
        <div className="table_dashboard">
          <Routes>
            <Route path="" element={<Dashboard />} />
            {/* Nested routes  */}
            <Route path="studentaccounttable" element={<StudentAccountTable />} />
            <Route path="feesreceiptlist" element={<FeesReceiptTable />} />


            {/* Nested routes  */}
            <Route path="feesstructuretable" element={<FeesStructureTable />} />
            <Route path="addnewstudent" element={<AddStudent />} />
            <Route path="studentprofile" element={<StudentProfile />} />
            <Route path="studentprofile/uploaddocument" element={<UploadDocumentFrom />} />
            <Route path="studentprofile/feesrecipt" element={<FeesRecipt />} />
            <Route path="studentprofile/updatepersonaldetial" element={<UpdatePersonalDetialOfStudent />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
