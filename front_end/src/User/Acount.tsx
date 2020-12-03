import { Redirect } from "react-router-dom";

export default function Acount(){
  const isAuthenticated = false;

  return (
    (isAuthenticated ? null : <Redirect to={"/"} />)
  );
};