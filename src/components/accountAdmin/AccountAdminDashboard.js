import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAnimate } from "react-simple-animate";

import "../components/styles/adminDashboard.css";

import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import FeesStructureTable from "../components/FeesStuctureTable";
import AdminTable from "../components/AdminTable";
import Sidebar from "../components/Sidebar";
import StudentTable from "../components/StudentsTable";
import AddNewStudent from "../components/AddNewStudent";
import AddStudent from "../components/AddStudent";
import { ToastContainer } from "react-toastify";
import SidebarLinks from "./SidebarLinks";


function AdminDashboard() {
  // const navigate = useNavigate()

  // const roleRedirection = (auth) => {
  //   if (auth === "SUPERADMIN") {
  //     navigate('/admindashboard')
  //   } else {
  //     navigate('/home')
  //   }
  // }

  // useEffect(() => {
  //   var auth = localStorage.getItem('role')
  //   console.log('====================================');
  //   console.log(auth);
  //   console.log('====================================');
  //   roleRedirection(auth);
  //   return () => {
  //     localStorage.clear();
  //   };
  // }, []);

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
        <Sidebar play={play} isPlaying={isPlaying} Options={SidebarLinks}/>
      </div>
      <div className="header_table">
        <div className="header_dashboard">
          <Navbar />
        </div>
        <div className="table_dashboard">
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="studenttable" element={<StudentTable />} />
            <Route path="admintable" element={<AdminTable />} />
            <Route path="feesstructuretable" element={<FeesStructureTable />} />
            {/* <Route path="addstudent" element={<AddStudent />} /> */}
            <Route path="addnewstudent" element={<AddStudent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
