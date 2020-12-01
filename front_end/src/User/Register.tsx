import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Container, Paper } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inami, setInami] = useState("");
  const [showError, setShowError] = useState(false);
  const theme = useTheme();

  const error = "error";

  const handleSubmit = (e : any) => {
    e.preventDefault();
    // dispatch(authorize(email,password));
    setShowError(true);
  };

  return (<div>
      {/* {isAuthenticated && <Redirect
              to={{
                pathname: "/"
              }}
            /> } */}
      <Container maxWidth="xs" disableGutters >
        <Grid container justify='space-around' alignItems='center' direction='column' style={{minHeight:"100vh"}} >
        <Paper elevation={10} >
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
            <Grid item xs={12}>
                <Button type="submit" variant="contained" >Register</Button>
            </Grid>
          </Grid>
          </form>
        </Paper>
        </Grid>
      </Container>
      </div>
  );
}