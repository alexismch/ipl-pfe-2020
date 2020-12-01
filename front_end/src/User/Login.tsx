import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Container, Paper, FormControlLabel, Checkbox } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { SignIn } from "utils/backend";

export default function Login({setAuth} : any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const [showError, setShowError] = useState(false);
  const isAuthenticated = false;

  const handleSubmit = (e : any) => {
    e.preventDefault();
    SignIn(token, email, password, isDoctor)
      .then(response => {
        setToken(String(response));
        localStorage.setItem("Token", String(response));
        setAuth(true);
      })
      .catch(error => {
        setError(error);
        setShowError(true);        
      })
  };

  return (<div>
      {isAuthenticated && <Redirect to="/" /> }
      <Container maxWidth="xs" disableGutters >
        <Grid container justify='space-around' alignItems='center' direction='column' style={{minHeight:"100vh"}} >
        <Paper elevation={10} >
          <form onSubmit={handleSubmit}>
          <Grid container >
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
            <FormControlLabel
              control={<Checkbox name="isDoctor" onChange={e => setIsDoctor(!isDoctor)} />}
              label="I am a doctor"
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
