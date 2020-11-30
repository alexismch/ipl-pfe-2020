import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../js/actions/auth";

const Logout = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if(isAuthenticated){
    dispatch(logout());
  };

  return (
    (isAuthenticated ? null : <Redirect to={"/"} />)
  );
};

export default Logout;