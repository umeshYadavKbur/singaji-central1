import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { useParams } from 'react-router';
// import { Redirect } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import 'react-toastify/dist/ReactToastify.css';
//import coreUireact js
import "@coreui/coreui/dist/css/coreui.min.css";
import AdminDashboard from "./components/superAdmin/AdminDashboard";
import StudentAdminDashboard from './components/studentAdmin/StudentAdminDashboard';
import AccountAdminDashboard from './components/accountAdmin/AccountAdminDashboard';
import SuperAdmin from "./helpers/SuperAdmin";
import AccountAdmin from "./helpers/AccountAdmin";
import StudentAdmin from "./helpers/StudentAdmin";


// import Offline from '../src/components/auth/Offline_page';

function App() {
  // const navigate = useNavigate()
  // window.addEventListener("online", function() {
  //   console.log("internet is ok!👍")
  // });

  // window.addEventListener("offline", function() {
  //   alert("Oops! You are offline now!");
  //   // navigate("/offline")
  //   //  return  <Offline></Offline>
  // });



  return (

    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgetpassword" element={<ForgotPassword />} />
          <Route
            exact
            path="/create_new_password/:token"
            element={<ResetPassword />}
          />
          <Route element={<SuperAdmin />}>
            <Route path="/admin_dashboard/*" element={<AdminDashboard />} />
          </Route>
          <Route element={<AccountAdmin />}>
            <Route path="/account_admin_dashboard/*" element={<AccountAdminDashboard />} />
          </Route>
          <Route element={<StudentAdmin />}>
            <Route path="/student_admin_dashboard/*" element={<StudentAdminDashboard />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;