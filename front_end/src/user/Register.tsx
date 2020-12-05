import React, {useState} from "react";
import {Grid, Container, Paper, Button, Typography, TextField} from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import {doctorRegistration, institutionRegistration} from "../utils/backend";
//import {response} from "express";

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
  const [instNoTVA, setInstNoTVA] = useState("");
  //Errors
  const [pwdNoMatchError, setPwdNoMatchError] = useState(false);
  const [emailAlreadyExistsError, setEmailAlreadyExistsError] = useState(false);

  const handleSubmit = (e:any) =>{
    console.log("Registered");
  }

  const handleDoctorClick = (e:any) => {
    setRegistrationAs("doctor");
  }

  const handleInsitutionClick = (e:any) => {
    setRegistrationAs("institution");
  }

  //PROBLEME DONT IL FAUT PARLER A OLIVIER!!

  /*

  Scénario à suivre pour le problème:
  1) entrer des données pour le docteur.
  2) dans les données, l'adresse mail doit etre ok@ok.ok (déjà utilisée) et exécuter avec le reste des données OK.
  3) mot de passe ne doivent plus correspondre
  4) exécuter la requète à nouveau
  5) corriger le mot de passe (ils correspoent maintenant)
  6) exécuter
  7) le message "mot de passe ne correspondent pas" toujours présent

   */
  const handleRegisterClick = (e : any) => {
    if (registrationAs === "doctor"){
      if (docPassword === docRepeatPwd){
        doctorRegistration(docFirstname, docName, docEmail, docPassword, inami)
          .then(response => {
            history.push("/login");
            console.log(response);
          }).catch(error => {
            if (error.response.status === 409){
              setEmailAlreadyExistsError(true);
            }
        })
      } else {
        setPwdNoMatchError(true);
      }
    } else if (registrationAs === "institution"){
      if (instPwd === instRepeatPwd){
        institutionRegistration(instName, instEmail, instPwd, instNoTVA)
            .then(response => {
              history.push("/login");
              console.log(response);
            }).catch(error => {
          if (error.response.status === 409){
            setEmailAlreadyExistsError(true);
          }
        })
      } else {
        setPwdNoMatchError(true);
      }
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
            //DOCTOR FORM!!
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

                {
                  emailAlreadyExistsError?
                    <p style={{color:"#FF0000", paddingLeft:"5%"}}>Email déjà utilisé.</p>
                    : null
                }
                <Grid item xs >
                  <TextField value={docEmail}
                             fullWidth
                             style={{width: "96%", paddingLeft:"2%"}}
                             placeholder="E-mail"
                             label="E-mail"
                             onChange={event => setDocEmail(event.target.value)}
                             variant="outlined"/>
                </Grid>
                {
                  pwdNoMatchError?
                      <p style={{color:"#FF0000", paddingLeft:"5%"}}>Les mots de passe ne correspondent pas.</p>
                      : null
                }
                <Grid item xs={12} >
                  <Grid container direction={"row"} spacing={1}>
                    <Grid item xs>
                      <TextField value={docPassword}
                                 fullWidth
                                 placeholder="Mot de passe"
                                 label="MDP"
                                 type={"password"}
                                 onChange={event => setDocPassword(event.target.value)}
                                 variant="outlined"/>
                    </Grid>
                    <Grid item xs >
                      <TextField value={docRepeatPwd}
                                 fullWidth
                                 placeholder="Répéter mot de passe"
                                 label="Répéter MDP"
                                 type={"password"}
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
                //----------------
                //INSTITUTION FORM
                //----------------
                : (registrationAs === "institution")?
              <Grid container direction={"column"}>
                <Grid item xs={12} style={{paddingTop:"3.8%", paddingBottom:"3.8%"}}>
                  <TextField value={instName}
                             fullWidth
                             placeholder="Nom"
                             label="Nom"
                             onChange={event => setInstName(event.target.value)}
                             variant="outlined"
                             style={{/*paddingTop:"2%", paddingBottom:"6%",*/ width: "96%", paddingLeft:"2%"}}/>
                </Grid>

                {
                  emailAlreadyExistsError?
                      <p style={{color:"#FF0000", paddingLeft:"5%"}}>Email déjà utilisé.</p>
                      : null
                }
                <Grid item xs >
                  <TextField value={instEmail}
                             fullWidth
                             style={{width: "96%", paddingLeft:"2%"}}
                             placeholder="E-mail"
                             label="E-mail"
                             onChange={event => setInstEmail(event.target.value)}
                             variant="outlined"/>
                </Grid>

                {
                  pwdNoMatchError?
                      <p style={{color:"#FF0000", paddingLeft:"5%"}}>Les mots de passe ne correspondent pas.</p>
                      : null
                }
                <Grid item xs={12} >
                  <Grid container direction={"row"} spacing={1}>
                    <Grid item xs>
                      <TextField value={instPwd}
                                 fullWidth
                                 placeholder="Mot de passe"
                                 label="MDP"
                                 type={"password"}
                                 onChange={event => setInstPwd(event.target.value)}
                                 variant="outlined"/>
                    </Grid>
                    <Grid item xs >
                      <TextField value={instRepeatPwd}
                                 fullWidth
                                 placeholder="Répéter mot de passe"
                                 label="Répéter MDP"
                                 type={"password"}
                                 onChange={event => setInstRepeatPwd(event.target.value)}
                                 variant="outlined"/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField value={instNoTVA}
                             fullWidth
                             style={{width: "96%", paddingLeft:"2%"}}
                             placeholder="Numéro TVA"
                             label="Numéro TVA"
                             onChange={event => setInstNoTVA(event.target.value)}
                             variant="outlined"/>
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