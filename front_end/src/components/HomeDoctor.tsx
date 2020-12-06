import React, {useEffect, useState} from "react";
import {
    Grid,
    Paper,
    Button,
    Collapse
} from "@material-ui/core";
import Overlay from "./Overlay";
import {getCurrentDoctorData} from "../utils/backend";
import {QRCodeList} from "./QRCodeList";
var QRCode = require('qrcode.react');



export default function Home(){
    const [showUniqueDoctorCode, setShowUniqueDoctorCode] = useState(true);
    const [doctorUniqueQRCodeValue, setDoctorUniqueQRCodeValue] = useState("");
    const [doctorName, setDoctorName] = useState("");
    useEffect(() => {
        getCurrentDoctorData(String(localStorage.getItem("Token")))
            .then((response:any) => {
                var id = String(response.data.id);
                var type = "d";
                var baseURL = "https://ipl-pfe-2020-dev-mobile.herokuapp.com/qr/"
                var qrContent = baseURL + type +"/"+id;
                setDoctorUniqueQRCodeValue(qrContent)
                setDoctorName(response.data.doctor_firstName + " " + response.data.doctor_lastName);
            }).catch(error => {
                console.log("Error")
            })
    }, [])

    return (<div>
    <Overlay doctorName={doctorName} />
    <Grid container style={{width:"100%"}} direction={"column"}>

        <Paper elevation={12} style={{marginTop:"1%", marginBottom:"1%"}}>
            <Collapse collapsedHeight={"80px"} in={showUniqueDoctorCode}>
                <Grid container direction={"column"} style={{alignContent:"center"}}>
                    <Button onClick={() => setShowUniqueDoctorCode(!showUniqueDoctorCode)} variant={"outlined"} style={{backgroundColor:"#6ccf7b", marginBottom:"10px"}}>{
                        showUniqueDoctorCode?
                            <p>Hide my doctor QR code</p>
                        : <p>Show my doctor QR code</p>
                    }</Button>
                    <QRCode value={doctorUniqueQRCodeValue} size={256}/>
                </Grid>
            </Collapse>
        </Paper>
        <QRCodeList/>

    </Grid>
    </div>)       
};