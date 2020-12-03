export default function Logout(){
  localStorage.removeItem("Token");
  
  return (
    null
  );
};