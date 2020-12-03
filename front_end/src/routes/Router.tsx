import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "user/Login";
import Logout from "user/Logout";
import Register from "user/Register";
import Acount from "user/Acount";
import HomeDoctor from "components/HomeDoctor";
//import HomeInstitution from "components/HomeInstitution";

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
            <Logout setAuth={setAuth}/>
          </Route>
          <Route exact path="/acount">
            <Acount />
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