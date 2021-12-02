import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from './components/auth/Login'
import ForgotPassword from './components/auth/ForgetPassword'
import ResetPassword from './components/auth/ResetPassword'
// import { useParams } from 'react-router';


function App() {
  // const Reset = `/CreateNewPassword/:${token}`
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/forgetpassword" component={ForgotPassword} />
          <Route path="/create_new_password/:token" component={ResetPassword} />
          <Route path='*' render={() => (
            // <Redirect to="/error" /> 
            <Redirect to="/login" />
          )} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
