import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useParams } from 'react-router';
import { Redirect } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";

//import coreUireact js
import "@coreui/coreui/dist/css/coreui.min.css";
import Dashboard from "./components/superAdmin/dashbord/Dashboard";
import AdminDashboard from "./components/superAdmin/dashbord/AdminDashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgetpassword" component={ForgotPassword} />
          <Route
            exact
            path="/create_new_password/:token"
            component={ResetPassword}
          />
          <Route path="/admindashboard" component={AdminDashboard} />
          <Route path="*" render={() => <Redirect to="/login" />} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
