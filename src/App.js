import React from 'react';
import Login from './Component/Login';
import ForgotPassword from './Component/ForgotPassword';
import ResetPassword from './Component/ResetPassword';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/ForgotPassword" component={ForgotPassword} />
          <Route path="/ResetPassword/:token" component={ResetPassword} />



        </Switch>
      </Router>
    </>
  );
}

export default App;
