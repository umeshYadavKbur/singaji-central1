import React from "react";
import { Switch, Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import AddStudent from "./components/AddStudent";
// import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./components/styles/adminDashboard.css";
import Navbar from "./components/Navbar";
import FeesStuctureTable from "./components/FeesStuctureTable";
import FeesStructureTable from "./components/FeesStuctureTable";
import AdminTable from "./components/AdminTable"
import Sidebar from "./components/Sidebar";
import StudentTable from './components/StudentsTable'
import { useAnimate } from "react-simple-animate";

import { ToastContainer, toast } from 'react-toastify';
function AdminDashboard() {

  const { play, style, isPlaying } = useAnimate({
    start: {
      width: "281px",
      minWidth: '280px',
    },
    end: {
      width: "95px",
      minWidth: '95px',
    }
  });
  return (
    <div className="main_container_dashboard">
      <ToastContainer />
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
          <Switch>
            <Route exact path="/admindashboard" component={Dashboard} />
            {/* <Route exact path="/admindashboard/admin_table" component={AdminTable} /> */}
            <Route exact path="/admindashboard/studenttable" component={StudentTable} />
            {/* <Route exact path="/admindashboard/fees_structure_table" component={FeesStuctureTable} /> */}
            <Route exact path="/admindashboard/admintable" component={AdminTable} />
            <Route exact path="/admindashboard/feesstructuretable" component={FeesStructureTable} />
            <Route
              exact
              path="/admindashboard/addstudent"
              component={AddStudent}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard