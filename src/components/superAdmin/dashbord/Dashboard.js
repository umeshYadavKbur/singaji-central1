import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ForgetPassword from "../../auth/ForgetPassword";
import Login from "../../auth/Login";
import ResetPassword from "../../auth/ResetPassword";
import Table from "../table/Table";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
// import Table from "../Table";
import "./styles/dashboard.css";
function Dashboard() {
  return (
    <div className="main_container_dashboard">
      <div className="side_bar_content">
        {/* <Sidebar /> */}
        sidebar
      </div>
      <div className="header_table">
        <div className="header_dashboard">
          <Navbar />
        </div>
        <div className="table_dashboard">
          <Router>
            <Switch>
              {/* <Route path="/dashboard" component={Dashboard} /> */}
              <Route path="/table" component={Table} />
              <Route path="/login" component={Login} />
              <Route path="/forgetpassword" component={ForgetPassword} />
              <Route
                path="/create_new_password/:token"
                component={ResetPassword}
              />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
