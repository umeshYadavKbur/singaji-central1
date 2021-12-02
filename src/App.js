import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useParams } from 'react-router';
import { Redirect } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
function App() {
  // const Reset = `/CreateNewPassword/:${token}`
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/forgetpassword" component={ForgotPassword} />
          <Route path="/create_new_password/:token" component={ResetPassword} />
          <Route
            path="*"
            render={() => (
              // <Redirect to="/error" />
              <Redirect to="/login" />
            )}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
