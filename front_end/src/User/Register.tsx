import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Container, Paper, useTheme } from "@material-ui/core";
import { Registration } from "utils/backend";
import { Redirect, useHistory } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [inami, setInami] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [showError, setShowError] = useState(false);
  const isAuthenticated = false;
  const theme = useTheme();
  const history = useHistory();

  const handleSubmit = (e : any) => {
    e.preventDefault();
    Registration(token, name, email, password, inami)
      .then(response => setToken(String(response)))
      .catch(error => {
        setError(error);
        setShowError(true);
    });
  };

  return (<div>
      {isAuthenticated ? <Redirect to="/" /> :
      <Container maxWidth="xs" disableGutters >
        <Grid container justify='space-around' alignItems='center' direction='column' style={{minHeight:"100vh"}}>
        <Paper elevation={10} >
          <Grid item container xs={12} justify="space-around"> 
              <img src="Logo.png" alt="BlockCovid" height={theme.spacing(10)} />
          </Grid>
          <form onSubmit={handleSubmit}>
          <Grid container >
            <Grid item container xs={12} >    
            <Typography variant='subtitle1' >Please register</Typography>
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
                value={name}
                fullWidth
                placeholder="Full name or institution name"
                onChange={event => setName(event.target.value)}
              />
            </Grid>
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
            <Grid item xs={12} >
                <Typography variant='subtitle2' >*If you are a doctor, please give in an INAMI-number</Typography>
                <TextField
                    value={inami}
                    fullWidth
                    placeholder="inami"
                    onChange={event => setInami(event.target.value)}
                />
            </Grid>
            <Grid container direction="row" justify="space-between">
              <Grid item>
                  <Button onClick={() => history.push("/register")} variant="contained" >to login</Button>
              </Grid>
              <Grid item>
                  <Button type="submit" variant="contained" >Register</Button>
              </Grid>
            </Grid>
          </Grid>
          </form>
        </Paper>
        </Grid>
      </Container>
      }
      </div>
  );
}