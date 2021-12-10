import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useParams } from 'react-router';
import { Redirect } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import AdminMainPage from "./components/superAdmin/AdminMainPage";
import StudenMainpage from "./components/superAdmin/StudenMainpage";
import ProtectedRoute from "./redux/constants/ProtectedRoute";
import AddStudent from "./components/superAdmin/AddStudent";

//import coreUireact js 
import '@coreui/coreui/dist/css/coreui.min.css';
import Dashboard from "./components/superAdmin/dashbord/Dashboard";
import Table from "./components/superAdmin/table/Table";


function App() {
  // const Reset = `/CreateNewPassword/:${token}`
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/table" component={Table} />
          <Route path="/login" component={Login} />
          <Route path="/forgetpassword" component={ForgotPassword} />
          <Route path="/create_new_password/:token" component={ResetPassword} />
          {/* protected Route is for  any can not jump in  another page */}
          <Route path="/student" ><ProtectedRoute Cmp={StudenMainpage} ></ProtectedRoute></Route>
          <Route path="/add_student" ><ProtectedRoute Cmp={AddStudent} ></ProtectedRoute></Route>
          <Route path="/admin" ><ProtectedRoute Cmp={AdminMainPage} ></ProtectedRoute></Route>
          <Route path="/home"  ><ProtectedRoute Cmp={Dashboard} ></ProtectedRoute></Route>
          <Route
            path="*"
            render={() => (
              <Redirect to="/toast" />
              // <Redirect to="/error" />
            )}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

