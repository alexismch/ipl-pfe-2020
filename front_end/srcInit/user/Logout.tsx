import {useEffect} from "react";

export default function Logout({authAsDoctor, setAuthAsDoctor, setAuthAsInstitution}:any){

  localStorage.removeItem("Token");
  localStorage.removeItem("ID_BlockCovid");
  localStorage.removeItem("Type_BlockCovid");
  useEffect(() => {
    if (authAsDoctor){
      setAuthAsDoctor(false);
    } else {
      setAuthAsInstitution(false);
    }
  })
  return null;
  
};