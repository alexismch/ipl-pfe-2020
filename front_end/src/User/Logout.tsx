import React from "react";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const isAuthenticated = false;

  // if(isAuthenticated){
  //   logout();
  // };

  return (
    (isAuthenticated ? null : <Redirect to={"/"} />)
  );
};

export default Logout;