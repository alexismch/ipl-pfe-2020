import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "user/Login";
import Logout from "user/Logout";
import HomeDoctor from "components/HomeDoctor";
import HomeInstitution from "components/HomeInstitution";
import Acount from "user/Acount";
import Register from "user/Register";

function PrivateRoute({ component : Component, ...rest }) {
  const authentication = localStorage.getItem("Token");
  var isAuthenticated = false;

  //check the token for validity
  if(authentication){
    isAuthenticated = true;
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? 
            <Component {...props} />
        : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const AuthRouter = () => {

  const isDoctor = true;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        {isDoctor ? 
          <PrivateRoute
            path="/home"
            component={HomeDoctor}
          />
        :
          <PrivateRoute
            path="/home"
            component={HomeInstitution}
          />
        }
        <PrivateRoute
          path="/acount"
          component={Acount}
        />
        <Redirect  from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default AuthRouter;
