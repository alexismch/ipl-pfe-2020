import React, {useState} from "react";
import {Grid, Container, Paper, Button, Typography, TextField} from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import {doctorRegistration} from "../utils/backend";

export default function Register() {
  const isAuthenticated = false;
  const history = useHistory();
  const [registrationAs, setRegistrationAs] = useState("doctor");
  //Doctor
  const [docName, setDocName] = useState("");
  const [docFirstname, setDocFirstName] = useState("");
  const [docEmail, setDocEmail] = useState("");
  const [docPassword, setDocPassword] = useState("");
  const [docRepeatPwd, setDocRepeatPwd] = useState("");
  const [inami, setInami] = useState("");
  //Institution
  const [instName, setInstName] = useState("");
  const [instEmail, setInstEmail] = useState("");
  const [instPwd, setInstPwd] = useState("");
  const [instRepeatPwd, setInstRepeatPwd] = useState("");

  const handleSubmit = (e:any) =>{
    console.log("Registered");
  }

  const handleDoctorClick = (e:any) => {
    setRegistrationAs("doctor");
  }

  const handleInsitutionClick = (e:any) => {
    setRegistrationAs("institution");
  }

  const handleRegisterClick = (e : any) => {
    if (registrationAs === "doctor"){

      console.log(docFirstname + " " + docName + " " + docEmail + " " + docPassword + " " + inami)

      doctorRegistration(docFirstname, docName, docEmail, docPassword, inami)
        .then(response => {
          console.log(response);
        }).catch(error => {
          console.log("Error OK");
          console.log(error);
      })
    } else if (registrationAs === "institution"){
      console.log("register as institution");
      console.log("name = " + instName + " mail = " + instEmail);
    } else {
      console.error("ERROR!");
    }
  }

  return (<div>
    {isAuthenticated ? <Redirect to="/" /> :
    <Container maxWidth="xs" disableGutters >
      <Grid container justify='space-around' alignItems='center' direction='column' style={{minHeight:"100vh"}}>
      <Paper elevation={10} style={{minHeight:"550px", minWidth:"440px"}}>
        <Grid item container xs={12} justify="space-around">
          <div className={"badge-promo"}>
              <span className={"badge-promo-content"}>S'enregistrer</span>
          </div>
        </Grid>

        <Grid container>
          <Grid item style={{paddingLeft:"5%"}}>
            <Typography variant='subtitle1' style={{textAlign:"center"}} >Je souhaite m'enregistrer en tant que :</Typography>
          </Grid>
        </Grid >


        <Grid container style={{paddingRight:"4%"}}>
          <Grid item xs={6}>
            {
              (registrationAs === "doctor")?
                  <Button className={"Register-as-button"} style={{backgroundColor: "#c4ffc5"}} onClick={handleDoctorClick} variant="contained" >Docteur</Button>
                  : <Button className={"Register-as-button"} onClick={handleDoctorClick} variant="contained" >Docteur</Button>
            }
          </Grid>
          <Grid item xs={6}>
            {
              (registrationAs === "institution")?
                  <Button className={"Register-as-button"} style={{backgroundColor: "#c4ffc5"}} onClick={handleInsitutionClick} variant="contained" >Institution</Button>
                  : <Button className={"Register-as-button"} onClick={handleInsitutionClick} variant="contained" >Institution</Button>
            }
          </Grid>
        </Grid>

        <form onSubmit={handleSubmit}>
          {
            (registrationAs === "doctor")?
              <Grid container direction={"column"}>
                <Grid item xs={12} >
                  <Grid container direction={"row"} spacing={1}>
                    <Grid item xs>
                      <TextField value={docFirstname}
                                 fullWidth
                                 placeholder="Prénom"
                                 label="Prénom"
                                 onChange={event => setDocFirstName(event.target.value)}
                                 variant="outlined"/>
                    </Grid>
                    <Grid item xs >
                      <TextField value={docName}
                                 fullWidth
                                 placeholder="Nom"
                                 label="Nom"
                                 onChange={event => setDocName(event.target.value)}
                                 variant="outlined"/>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs >
                  <TextField value={docEmail}
                             fullWidth
                             style={{width: "96%", paddingLeft:"2%"}}
                             placeholder="E-mail"
                             label="E-mail"
                             onChange={event => setDocEmail(event.target.value)}
                             variant="outlined"/>
                </Grid>

                <Grid item xs={12} >
                  <Grid container direction={"row"} spacing={1}>
                    <Grid item xs>
                      <TextField value={docPassword}
                                 fullWidth
                                 placeholder="Mot de passe"
                                 label="MDP"
                                 onChange={event => setDocPassword(event.target.value)}
                                 variant="outlined"/>
                    </Grid>
                    <Grid item xs >
                      <TextField value={docRepeatPwd}
                                 fullWidth
                                 placeholder="Répéter mot de passe"
                                 label="Répéter MDP"
                                 onChange={event => setDocRepeatPwd(event.target.value)}
                                 variant="outlined"/>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs >
                  <TextField value={inami}
                             fullWidth
                             style={{width: "96%", paddingLeft:"2%"}}
                             placeholder="Numéro inami"
                             label="Numéro inami"
                             onChange={event => setInami(event.target.value)}
                             variant="outlined"/>
                </Grid>


              </Grid>

                : (registrationAs === "institution")?
              <Grid container direction={"column"}>
                <Grid item xs={12} >
                  <TextField value={instName}
                             fullWidth
                             placeholder="Nom"
                             label="Nom"
                             onChange={event => setInstName(event.target.value)}
                             variant="outlined"
                             style={{paddingTop:"2%", paddingBottom:"2%", width: "96%", paddingLeft:"2%"}}/>
                </Grid>
                <Grid item xs={12} >
                  <TextField value={instEmail}
                             fullWidth
                             placeholder="E-mail"
                             label="E-mail"
                             onChange={event => setInstEmail(event.target.value)}
                             variant="outlined"
                             style={{paddingTop:"2%", paddingBottom:"2%", width: "96%", paddingLeft:"2%"}}/>
                </Grid>
                <Grid item xs={12} >
                  <TextField value={instPwd}
                             fullWidth
                             placeholder="Mot de passe"
                             label="Mot de passe"
                             onChange={event => setInstPwd(event.target.value)}
                             variant="outlined"
                             style={{paddingTop:"2%", paddingBottom:"2%", width: "96%", paddingLeft:"2%"}}/>
                </Grid>
                <Grid item xs={12} >
                  <TextField value={instRepeatPwd}
                             fullWidth
                             placeholder="Répéter le mot de passe"
                             label="Répéter le mot de passe"
                             onChange={event => setInstRepeatPwd(event.target.value)}
                             variant="outlined"
                             style={{paddingTop:"2%", paddingBottom:"2%", width: "96%", paddingLeft:"2%"}}/>


                </Grid>
              </Grid> : null
          }

          {

            registrationAs?
            <Grid container style={{paddingRight:"4%"}}>
              <Grid item xs={6} >
                <Button style={{backgroundColor:"#ffa9a9", width:"180px"}} onClick={() => history.push("/login")} variant="contained" >Retour</Button>
              </Grid>
              <Grid item xs={6}>
                <Button className={"Register-button"} onClick={handleRegisterClick} variant="contained" >S'enregistrer</Button>
              </Grid>
            </Grid> : null

          }

        </form>
      </Paper>
      </Grid>
    </Container>
    }
    </div>
  );
}