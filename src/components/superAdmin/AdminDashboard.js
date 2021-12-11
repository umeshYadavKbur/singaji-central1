import React from "react";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import AddStudent from './components/AddStudent'

// import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./components/styles/dashboard.css";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

function AdminDashboard() {
  return (
    <div className="main_container_dashboard">
      <div className="side_bar_content">
        {/* <Sidebar /> */}
        sidebar
        <Link
          to="/admindashboard/addstudent"
          style={{
            color: "gray",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Add Student
        </Link>
        <Link
          to="/admindashboard/table"
          style={{
            color: "gray",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Table data
        </Link>
      </div>
      <div className="header_table">
        <div className="header_dashboard">
          <Navbar />
        </div>
        <div className="table_dashboard">
          <Switch>
            <Route exact path="/admindashboard" component={Dashboard} />
            <Route
              exact
              path="/admindashboard/addstudent"
              component={AddStudent}
            />
            <Route exact path="/admindashboard/table" component={Table} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
