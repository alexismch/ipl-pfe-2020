import React from "react";
import { Button, Grid, Container, Paper} from "@material-ui/core";
import Overlay from "./Overlay";

export default function Home(){

    const handleSubmit = (e : any) => {
        e.preventDefault();
        console.log("here we generate a QR-Code and send the info to the backend")
        //if there is already a QR-code, do not generate
    };
    
    return (<div>
      <Overlay />
      <Container maxWidth="xs" disableGutters >
        <Grid container justify='space-around' alignItems='center' direction='column' style={{minHeight:"100vh"}} >
        <Paper elevation={10} >
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
                <Button type="submit" variant="contained" >Get my QR-CODE</Button>
            </Grid>
          </form>
        </Paper>
        </Grid>
      </Container>
    </div>)       
};