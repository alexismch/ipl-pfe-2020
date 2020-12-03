import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Paper,
  FormControlLabel,
  FormControl, 
  FormLabel, 
  RadioGroup, 
  Radio, 
  withStyles,
  useTheme
} from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import { Redirect, useHistory } from "react-router-dom";
import { SignIn } from "utils/backend";

export default function Login({setAuth} : any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDoctor, setIsDoctor] = useState(true);
  const [showError, setShowError] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Doctor");
  const isAuthenticated = false;
  const theme = useTheme();
  const history = useHistory();

  const handleSubmit = (e : any) => {
    e.preventDefault();
    SignIn(email, password, isDoctor)
      .then((response : any) => {
        localStorage.setItem("Token", String(response.data.session));
      })
      .catch(error => {
        setError(error);
        setShowError(true);        
      })
  };

  //Green color for radio buttons.
  // explanation found here : https://material-ui.com/components/radio-buttons/
  const GreenRadio = withStyles({
    root: {
      //Green is a dictionary containing an int as key and an hexadecimal color as value.
      //Just put 6000 instead of 400 for mor information (it will throw an error.)
      color: green[400],
      '&$checked': {
        color: green[700],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  //Changes de value of IsDoctor according to the radio button selected
  // in the login form.
  const handleChange = (e : any) => {
    if (e.target.value === "Doctor"){
      setIsDoctor(true);
      setSelectedValue("Doctor");
    } else if (e.target.value === "Establishment"){
      setIsDoctor(false);
      setSelectedValue("Establishment");
    } else {
      throw new Error("Wrong radio selected.");
    }
  }

  return (<div >
      {isAuthenticated && <Redirect to="/" /> }
      <Container maxWidth="xs" disableGutters >
        <Grid container justify='space-around' alignItems='center' direction='column' style={{minHeight:"100vh"}} >
        <Paper elevation={15} >
          <form onSubmit={handleSubmit}>
          <Grid container >
            <Grid item container xs={12} style={{padding : "0px"}} justify="space-around"> 
                <img src="Logo.png" alt="BlockCovid" height={theme.spacing(10)} />
            </Grid>
            <Grid item xs={12} >    
              <Typography variant='subtitle1' >Please sign-in</Typography>
            </Grid>
            {
              showError && error ? 
              <Grid item xs={12} >
                {error}
              </Grid>
              : null
            }

            {/*
                Start Modification done by bruno.
                old code at the end of this page.
              */}
            <Grid item xs={12} >
              <TextField
                id="E-mail"
                label="Enter your E-mail"
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
                type="password"
                fullWidth
                placeholder="Password"
                label="Enter your password"
                onChange={event => setPassword(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl component="fieldset" >
              <FormLabel component="legend">I am : </FormLabel>
              <RadioGroup aria-label="I am" name="isDoctor" onChange={handleChange}>
                <FormControlLabel value="Doctor" checked={selectedValue === "Doctor"} control={<GreenRadio />} label="A Doctor" />
                <FormControlLabel value="Establishment" checked={selectedValue === "Establishment"} control={<GreenRadio />} label="An Establishment" />
              </RadioGroup>
            </FormControl>
            {/*End Moddification effectuée par bruno.*/}


            </Grid>
            <Grid container direction="row" justify="space-between">
              <Grid item>
                  <Button onClick={() => history.push("/register")} variant="contained" >Register</Button>
              </Grid>
              <Grid item>
                  <Button type="submit" variant="contained" >Sign in</Button>
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
