import { Redirect } from "react-router";

export default function Logout(){

  localStorage.removeItem("Token");
  
  return (
    <Redirect to="/login" />
  );
};