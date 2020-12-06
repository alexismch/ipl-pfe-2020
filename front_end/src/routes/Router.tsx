import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "user/Login";
import Logout from "user/Logout";
import Register from "user/Register";
import Account from "user/Account";
import HomeDoctor from "components/HomeDoctor";
import HomeInstitution from "components/HomeInstitution";
import CodesList from "components/CodesList";

export default function Router(){
  //const [auth, setAuth] = useState(false);
  const [authAsDoctor, setAuthAsDoctor] = useState(false);
  const [authAsInstitution, setAuthAsInstitution] = useState(false);


  useEffect(() => {
    /*if (localStorage.getItem("Token")){
      //TODO If valid token... To be continued.
      setAuth(true);
    }*/

    if (localStorage.getItem("Type_BlockCovid") === "doctor"){
      setAuthAsDoctor(true);
    } else if (localStorage.getItem("Type_BlockCovid") === "institution"){
      setAuthAsInstitution(true);
    }
  }, [])

  return (
    <BrowserRouter>
        {authAsDoctor || authAsInstitution ?
        <Switch>
          <Route exact path="/home">
            {
              (authAsDoctor)?
                <HomeDoctor/>
              : <HomeInstitution/>
            }
          </Route>
          <Route exact path="/codesList">
            <CodesList />
          </Route>
          <Route exact path="/logout">
            <Logout authAsDoctor={authAsDoctor} setAuthAsDoctor={setAuthAsDoctor} setAuthAsInstitution={setAuthAsInstitution}/>
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
          <Redirect to="/home" />
        </Switch>
        : 
        <Switch>
          <Route exact path="/login">
            <Login setAuthAsDoctor={setAuthAsDoctor} setAuthAsInstitution={setAuthAsInstitution}/>
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