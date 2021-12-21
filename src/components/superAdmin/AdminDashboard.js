import React ,{ useEffect }  from "react";
import { Routes, Route } from "react-router-dom";
import AddStudent from "./components/AddStudent";
// import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./components/styles/adminDashboard.css";
import Navbar from "./components/Navbar";
// import FeesStuctureTable from "./components/FeesStuctureTable";
import FeesStructureTable from "./components/FeesStuctureTable";
import AdminTable from "./components/AdminTable";
import Sidebar from "./components/Sidebar";
import StudentTable from "./components/StudentsTable";
import { useAnimate } from "react-simple-animate";

// import { ToastContainer, toast } from 'react-toastify';
function AdminDashboard() {


  useEffect(() => {
    // const notify = () => toast.success("Login Successfull");
    // notify();
    return () => {
    }
  }, [])

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
     {/* <ToastContainer
position="top-center"
autoClose={2500}
hideProgressBar={true}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/> */}
      <div
        className="side_bar_content"
        style={style}
      >
        <Sidebar play={play} isPlaying={isPlaying} />
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
            <Route path="addstudent" element={<AddStudent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
