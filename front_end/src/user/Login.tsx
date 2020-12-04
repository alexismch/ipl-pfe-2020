import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Paper
} from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";

export default function Login({setAuth} : any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authFailed, setAuthFailed] = useState(false);
  const isAuthenticated = false;
  const history = useHistory();

  const handleSubmit = (e : any) => {
    e.preventDefault();
    console.log("Clicked");
  };

  return (<div >
      {isAuthenticated && <Redirect to="/" /> }
      <Container maxWidth="xs" disableGutters >
        <Grid container justify='space-around' alignItems='center' direction='column' style={{minHeight:"100vh"}} >
        <Paper elevation={15} >
          <form onSubmit={handleSubmit}>
          <Grid container >
            <Grid item container xs={12} style={{padding : "0px"}} justify="space-around">
              <div className={"badge-promo"}>
                <span className={"badge-promo-content"}>Connexion</span>
              </div>
            </Grid>
            {
              authFailed ?
              <Grid item xs={12} >
                <p style={{color:"#ff0000"}}>Erreur durant la tentative de connexion. Veuillez réessayer.</p>
              </Grid>
              : null
            }

            <Grid item xs={12} >
              <TextField
                id="E-mail"
                label="Entrez votre E-mail"
                placeholder="E-mail"
                multiline
                variant="outlined"
                value={email}
                onChange={event => setEmail(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                type="Mot de passe"
                fullWidth
                placeholder="Mot de passe"
                label="Entrez votre mot de passe"
                onChange={event => setPassword(event.target.value)}
                variant="outlined"
              />
            </Grid>

            <Grid container direction="row" justify="space-between">
              <Grid item>
                  <Button onClick={() => history.push("/register")} variant="contained" >S'enregistrer</Button>
              </Grid>
              <Grid item>
                  <Button type="submit" variant="contained" >Se connecter</Button>
              </Grid>
            </Grid>
          </Grid>
          </form>
        </Paper>
        </Grid>
      </Container>
      </div>
  );

  /*
   Old checkbox for the doctor boolean.
  <FormControlLabel
      control={<Checkbox name="isDoctor" onChange={e => setIsDoctor(!isDoctor)} />}
      label="I am a doctor"
  />

   */
}
