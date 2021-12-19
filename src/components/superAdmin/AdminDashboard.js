import React from "react";
import { Switch, Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import AddStudent from "./components/AddStudent";
// import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./components/styles/dashboard.css";
import Navbar from "./components/Navbar";
import FeesStructureTable from "./components/FeesStuctureTable";
import AdminTable from "./components/AdminTable"
import Sidebar from "./components/Sidebar";
import { connect } from "react-redux";

function AdminDashboard({ sidebar }) {
  console.log("====================================");
  console.log(sidebar);
  console.log("====================================");
  return (
    <div className="main_container_dashboard">
      <div
        style={
          sidebar.show
            ? {
              height: "100vh",
              width: "95px",
              backgroundColor: "#F4F7FC",
            }
            : {
              height: "100vh",
              minWidth: "285px",
              backgroundColor: "#F4F7FC",
            }
        }
      >
        <Sidebar />

      </div>
      <div className="header_table">
        <div className="header_dashboard">
          <Navbar />
        </div>
        <div className="table_dashboard">
          <Switch>
            <Route exact path="/admindashboard" component={Dashboard} />
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

//Getting the state from the store
const mapStateToProps = (state) => {
  return {
    sidebar: state.sidebar,
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, null)(AdminDashboard);
