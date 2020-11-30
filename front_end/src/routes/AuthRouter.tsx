import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "User/Login";
import Logout from "User/Logout";
import Home from "components/Home";

// function PrivateRoute({ component: Component, restrictedTo, ...rest }) {
//   const authenticated = useSelector(state => state.auth.isAuthenticated);
//   const activeRole = useState("");
//   const authenticated = true;
//   const appropriate = restrictedTo ? activeRole === restrictedTo : true;

//   if (!authenticated) {
//     dispatch(entry(document.location.pathname));
//   }

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         authenticated === true ? (
//           appropriate === true ? (
//             <Component {...props} />
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/",
//                 state: { from: "/" }
//               }}
//             />
//           )
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

const AuthRouter = () => {
  // const token = "hello";
  // let lastAuthentication = null;

  // if (token) {
  //   lastAuthentication = lastAuthentication
  //     ? new Date(lastAuthentication)
  //     : new Date(2000, 1, 1);
  //   const numberHours =
  //     (new Date().getTime() - lastAuthentication.getTime()) / (1000 * 3600);

  //   if (numberHours < 1) {
  //     console.log("Recent authentication found.");
  //   } else {
  //     dispatch(tokenAuthenticated(token));
  //   }
  // }
  // else
  // {
  //   console.log("No token.");
  // }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        {/* <PrivateRoute
          path="/home"
          component={Home}
        /> */}
        <Route exact path="/home" component={Home} />
        <Redirect  from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default AuthRouter;
