import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "User/Login";
import Logout from "User/Logout";
import Register from "User/Register";
import Home from "components/Home";

const AuthRouter = () => {
//TODO JWT TOKEN

  const auth = false;

  return (
    <BrowserRouter>
        {auth ? 
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
        </Switch>
        : 
        <Switch>
          <Route exact path="/login">
            <Login />
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

export default AuthRouter;
