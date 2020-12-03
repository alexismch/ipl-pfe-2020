import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "User/Login";
import Logout from "User/Logout";
import Register from "User/Register";
import HomeDoctor from "components/HomeDoctor";
import HomeInstitution from "components/HomeInstitution";

export default function Router(){
//TODO JWT TOKEN

  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("Token")){

      //If valid token... To be continued.

      setAuth(true);
    }
  }, [])

  return (
    <BrowserRouter>
        {auth ? 
        <Switch>
          <Route exact path="/home">
            <HomeDoctor/>
            {/* <HomeInstitution/> */}
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Redirect to="/home" />
        </Switch>
        : 
        <Switch>
          <Route exact path="/login">
            <Login setAuth={setAuth}/>
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Redirect to="/login" />
        </Switch>
        }
    </BrowserRouter>
  );
};