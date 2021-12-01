import React from 'react';
import Login from './Component/Login';
import ForgotPassword from './Component/ForgotPassword';
import ResetPassword from './Component/ResetPassword';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { Redirect } from 'react-router';
// import { useParams } from 'react-router';
import Home from './Component/Home';


function App() {

  

  // const Reset = `/CreateNewPassword/:${token}`

  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="/ForgotPassword" component={ForgotPassword} />
          <Route path="/create_new_password/:token" component={ResetPassword} />
          <Route path='*' render={() =>
          (
            <Redirect to="/error" />
          )
          } />

        </Switch>
      </Router>
    </>
  );
}

export default App;
