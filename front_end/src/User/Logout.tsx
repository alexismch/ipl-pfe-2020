import React from "react";
import { Redirect } from "react-router-dom";

function logout(){
  return null;
}

const Logout = () => {
  const isAuthenticated = false;

  return (
    (isAuthenticated ? logout() : <Redirect to={"/"} />)
  );
};

export default Logout;