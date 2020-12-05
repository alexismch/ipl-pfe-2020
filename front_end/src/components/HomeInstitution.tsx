import React, { useState } from "react";
import { Grid, Container, Paper, Typography, FormControl, TextField, Button} from "@material-ui/core";
import Overlay from "./Overlay";
import { useHistory } from "react-router-dom";

export default function Home(){
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
     
  function handleSubmit(){
    return null;
  }

    return (<div>
      <Overlay />
      <Container maxWidth="xs" disableGutters >
        <Paper elevation={10} >
        <Grid container justify='space-around' alignItems='center' direction='column' >
          <FormControl onSubmit={handleSubmit}>
            <Grid item>
              <Typography variant="subtitle1">New location</Typography>
            </Grid>
            <Grid item>
              <TextField value={name}
                          fullWidth
                          placeholder="Nom"
                          label="Nom"
                          onChange={event => setName(event.target.value)}
                          variant="outlined"
                          style={{/*paddingTop:"2%", paddingBottom:"6%",*/ width: "96%", paddingLeft:"2%"}}/>
            </Grid>
            <Grid item>
              <TextField value={description}
                          fullWidth
                          placeholder="description"
                          label="Description"
                          onChange={event => setDescription(event.target.value)}
                          variant="outlined"
                          style={{/*paddingTop:"2%", paddingBottom:"6%",*/ width: "96%", paddingLeft:"2%"}}/>
            </Grid>
            <Grid container direction="row" justify="space-between">
              <Grid item>
                  <Button onClick={() => history.push("/codesList")} variant="contained" >See my QR-Codes</Button>
              </Grid>
              <Grid item>
                  <Button type="submit" variant="contained" >Submit</Button>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
        </Paper>
      </Container>
    </div>)       
};