import React from "react";
import { Grid, Container } from "@material-ui/core";
import Overlay from "./Overlay";
import { QRCodeList } from "./QRCodeList";

export default function Home(){
    return (<div>
      <Overlay />
      <Container maxWidth="xs" disableGutters >
        <Grid>
          <QRCodeList/>
        </Grid>
      </Container>
    </div>)       
};