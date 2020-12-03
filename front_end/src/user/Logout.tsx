import { Redirect } from "react-router";
import { SignOut } from "utils/backend";

export default function Logout(){

  SignOut();
  
  return (
    <Redirect to="/login" />
  );
};