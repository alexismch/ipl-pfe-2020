import React, {useEffect, useState} from "react";
import {
    Grid,
    Paper,
    Button,
    Collapse
} from "@material-ui/core";
import Overlay from "./Overlay";
import {getCurrentDoctorInfo} from "../utils/backend";
import QRCodeListItem from "components/QRCodeListItem";
var QRCode = require('qrcode.react');



export default function Home(){
    const [showUniqueDoctorCode, setShowUniqueDoctorCode] = useState(true);
    const [doctorUniqueQRCodeValue, setDoctorUniqueQRCodeValue] = useState("");
    const [shown, setShown] = useState(false);
    useEffect(() => {
        getCurrentDoctorInfo(String(localStorage.getItem("Token")))
            .then((response:any) => {
                var id = String(response.data.id);
                setDoctorUniqueQRCodeValue("{\"id\":\""+ id +"\", \"type\":\"doctor\"}") //{"id":id, "type":"doctor"}
            }).catch(error => {
                console.log("Error")
            })
    }, [])

    return (<div>
    <Overlay />
    <Grid container style={{width:"100%"}} direction={"column"}>


        <Paper elevation={12} style={{marginTop:"1%"}}>
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


        <QRCodeListItem />
        <QRCodeListItem />
        <QRCodeListItem />

    </Grid>
    </div>)       
};