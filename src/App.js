import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/auth/Login";
import { Route } from "react-router";

function App() {
  return (
    <Route>
      <div>
        <Login />
      </div>
    </Route>
  );
}
export default App;
