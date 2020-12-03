export default function Logout({setAuth}:any){

  localStorage.removeItem("Token");
  setAuth(false);

  return null;
  
};