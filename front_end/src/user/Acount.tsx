import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

export default function Acount(){
  const history = useHistory();

  return (<div>
    <Button onClick={() => history.push("/")} variant="contained" >Home</Button>
  </div>);
};