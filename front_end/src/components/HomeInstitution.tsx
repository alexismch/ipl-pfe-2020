import React from "react";
import { Grid, Container, Paper} from "@material-ui/core";
import Overlay from "./Overlay";

export default function Home(){
    
    return (<div>
      <Overlay />
      <Container maxWidth="xs" disableGutters >
        <Grid container justify='space-around' alignItems='center' direction='column' >
        <Paper elevation={10} >
          DISPLAY ZE QR CODE FOR ZE TOBYB
        </Paper>
        </Grid>
      </Container>
    </div>)       
};