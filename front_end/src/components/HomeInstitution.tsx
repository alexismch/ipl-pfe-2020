import React from "react";
import { Grid, Container, Paper, Typography, FormControl} from "@material-ui/core";
import Overlay from "./Overlay";

function handleSubmit(){
  return null;
}

export default function Home(){
    
    return (<div>
      <Overlay />
      <Container maxWidth="xs" disableGutters >
        <Grid container justify='space-around' alignItems='center' direction='column' >
        <Paper elevation={10} >
        <FormControl onSubmit={handleSubmit}>
          <Typography variant="subtitle1">New location</Typography>
        </FormControl>
        </Paper>
        </Grid>
      </Container>
    </div>)       
};