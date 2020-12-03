import {useEffect} from "react";

export default function Logout({setAuth}:any){

  localStorage.removeItem("Token");
  useEffect(() => {
    setAuth(false);
  })

  return null;
  
};