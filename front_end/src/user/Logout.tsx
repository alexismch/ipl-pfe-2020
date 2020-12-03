import { Redirect } from "react-router-dom";

export default function Logout(){

  localStorage.removeItem("Token");

  return <Redirect to ="/login" />;
  
};