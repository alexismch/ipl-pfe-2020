import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "../components/User/Login";
import Logout from "../components/User/Logout";
import MapView from "../components/Pages/MapPage";
import Comparison from "../components/Pages/ComparisonPage";
import Density from "../components/Pages/DensityPage";

import { useSelector, useDispatch } from "react-redux";
import { tokenAuthenticated, entry } from "../js/actions/auth";

function PrivateRoute({ component: Component, restrictedTo, ...rest }) {
  const authenticated = useSelector(state => state.auth.isAuthenticated);
  const activeRole = useSelector(state => state.auth.role);
  const appropriate = restrictedTo ? activeRole === restrictedTo : true;
  const dispatch = useDispatch();

  if (!authenticated) {
    dispatch(entry(document.location.pathname));
  }

  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          appropriate === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: "/" }
              }}
            />
          )
        ) : (
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
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  let lastAuthentication = useSelector(state => state.auth.since);

  if (token) {
    lastAuthentication = lastAuthentication
      ? new Date(lastAuthentication)
      : new Date(2000, 1, 1);
    const numberHours =
      (new Date().getTime() - lastAuthentication.getTime()) / (1000 * 3600);

    if (numberHours < 1) {
      console.log("Recent authentication found.");
    } else {
      dispatch(tokenAuthenticated(token));
    }
  }
  else
  {
    console.log("No token.");
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <PrivateRoute
          path="/density"
          component={Density}
        />
        <PrivateRoute
          path="/comparison"
          component={Comparison}
        />
        <PrivateRoute
          path="/map"
          component={MapView}
        />
        <Redirect  from="/" to="/map" />
      </Switch>
    </BrowserRouter>
  );
};

export default AuthRouter;
