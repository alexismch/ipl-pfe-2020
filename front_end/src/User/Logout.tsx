import { Redirect } from "react-router";
import logout from "utils/backend";

export default function Logout(){

  logout();
  
  return (
    <Redirect to="/login" />
  );
};