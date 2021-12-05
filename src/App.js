import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useParams } from 'react-router';
import { Redirect } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Home from "./components/tyingToRedirect/Home";
import About from "./components/tyingToRedirect/About";
import Settings from "./components/tyingToRedirect/Settings";

function App() {
  // const Reset = `/CreateNewPassword/:${token}`
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/settings" component={Settings} />
          <Route path="/forgetpassword" component={ForgotPassword} />
          <Route path="/create_new_password/:token" component={ResetPassword} />
          <Route
            path="*"
            render={() => (
              // <Redirect to="/error" />
              <Redirect to="/home" />
            )}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

