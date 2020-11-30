import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Container, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { authorize } from "../../js/actions/auth";
import { useTheme } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useReduxPrefsState } from "../../js/actions/prefs";
import background from "../../img/banner.jpg"

export default function Login() {
  const [email, setEmail] = useReduxPrefsState("email","");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const theme = useTheme();

  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.errorMessage);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authorize(email,password));
    setShowError(true);
  };

  return (<div style={{ backgroundImage : `url(${background})`, backgroundAttachment: "fixed"}}>
      {isAuthenticated && <Redirect
              to={{
                pathname: "/"
              }}
            /> }
      <Container maxWidth="xs" disableGutters >
        <Grid container justify='space-around' alignItems='center' direction='column' style={{minHeight:"100vh"}} >
        <Paper elevation={10} >
          <form onSubmit={handleSubmit}>
          <Grid container >
            <Grid item container xs={12} justify='center' >
              <Grid item >      
                <a href="https://www.syty.io/" ><img src="/sytyio.png" alt="syty.io" height={theme.spacing(7)} /></a>
              </Grid>
            </Grid>
            <Grid item container xs={12} >    
            <Typography variant='subtitle1' >Please sign-in</Typography>
            </Grid>
            {
              showError && error ? 
              <Grid item xs={12} >
                {error}
              </Grid>
              : null
            }
            <Grid item xs={12} >
              <TextField
                value={email}
                fullWidth
                placeholder="E-mail"
                onChange={event => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                type="password"
                fullWidth
                placeholder="Password"
                onChange={event => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" variant="contained" >Sign in</Button>
            </Grid>
          </Grid>
          </form>
        </Paper>
        </Grid>
      </Container>
      </div>
  );
}
