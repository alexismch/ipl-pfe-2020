import React, { useState } from "react";
import {
    Button,
    List,
    ListItem,
    Popover,
    Box,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, TextField, DialogActions, TextareaAutosize
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {createNewDoctorLocation} from "../utils/backend";
import {response} from "express";

export default function Overlay({doctorName, setDoctorName}:any){
    const [anchorEl, setAnchorEl] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [locationName, setLocationName] = useState("");
    const [locationDescription, setLocationDescription] = useState("");
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    //const theme = useTheme();
    const history = useHistory();

    const handleOpen = (e : any) =>  {
        setAnchorEl(e.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFormOpen = () => {
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
    };

    const handleFormSubmit = () => {
        if (locationName && locationDescription){
            console.log(locationName)
            console.log(locationDescription)
            createNewDoctorLocation(String(localStorage.getItem("Token")), locationName, locationDescription)
                .then(response => {
                    setLocationName("");
                    setLocationDescription("");
                    setFormOpen(false);
                    setDoctorName(String(doctorName));
                }).catch(error => {
                    console.log(error);
            })
        }
    }
    return (
        <div className={"big-badge-promo"}>
            <div className={"big-badge-promo-content"}>
                <Grid container direction="row" alignItems="center" justify="space-between">
                    <span className={"app-title"}>BLOCKCOVID</span>
                    <Box ml={1} >
                        <Button onClick={handleOpen} variant="contained" >{String(doctorName)}</Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <List disablePadding>
                                <ListItem disableGutters>

                                    <div>
                                        <Button style={{backgroundColor:"#6ccf7b", color:"#5a5c5a"}} variant="outlined" color="primary" onClick={handleFormOpen}>
                                            Nouveau QR code!
                                        </Button>
                                        <Dialog open={formOpen} onClose={handleFormClose} aria-labelledby="form-dialog-title">
                                            <DialogTitle id="form-dialog-title">Nouveau QRCode</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Pour créer un nouveau QRCode, veuillez entrer le nom du lieu ainsi qu'une description.
                                                </DialogContentText>
                                                <TextField
                                                    id="locationName"
                                                    label="Entrez le nom du lieu"
                                                    placeholder="Nom de du lieu"
                                                    multiline
                                                    variant="outlined"
                                                    value={locationName}
                                                    onChange={event => setLocationName(event.target.value)}
                                                    fullWidth
                                                    style={{paddingBottom:"3%"}}
                                                />
                                                <TextField
                                                    id="locationDescription"
                                                    label="Description du lieu"
                                                    multiline
                                                    variant="outlined"
                                                    fullWidth
                                                    value={locationDescription}
                                                    onChange={(e) => setLocationDescription(e.target.value)}
                                                    style={{height:"10%"}}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleFormClose} color="primary">
                                                    Cancel
                                                </Button>
                                                <Button onClick={handleFormSubmit} color="primary">
                                                    Subscribe
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>

                                </ListItem>
                                <ListItem disableGutters style={{paddingLeft:"30%"}}>
                                    <Button onClick={() => history.push("/logout")} variant="contained">
                                        Logout
                                    </Button>
                                </ListItem>
                            </List>
                        </Popover>
                    </Box>
                </Grid>
            </div>
        </div>
        );
}