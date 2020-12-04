import React from "react";
import {
    Grid,
    Container,
    Paper,
    Button
} from "@material-ui/core";
import Overlay from "./Overlay";
import {getQRCodeToken} from "../utils/backend";
import {response} from "express";

const generateQRCode = () => {
    getQRCodeToken(String(localStorage.getItem("Token")))
        .then((response:any) => {
        console.log(String(response.data.qrCodeToken));
    })
}

export default function Home(){

    return (<div>
      <Overlay />
      <Container maxWidth="xs" disableGutters >
        <Grid container justify='space-around' alignItems='center' direction='column' >
        <Paper elevation={12} >
            <Grid item>
                <Button onClick={generateQRCode} variant="contained" >Generate Code</Button>
            </Grid>
            <p></p>
            <p>Put list of QRCodes here.</p>
        </Paper>
        </Grid>
      </Container>
    </div>)       
};