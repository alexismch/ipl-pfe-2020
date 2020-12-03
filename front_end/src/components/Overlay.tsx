import React, { useState } from "react";
import { Button, List, ListItem, Popover, Box, Grid, useTheme, Paper } from "@material-ui/core";
import { Redirect } from "react-router-dom";

export default function Overlay(){
    const user = "Name to retrieve";
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const theme = useTheme();

    const handleOpen = (e : any) =>  {
        setAnchorEl(e.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<Paper elevation={15} style={{padding: 0}}>
        <Grid container  direction="row" alignItems="center" justify="space-between">
            <Box >
                <img src="Logo.png" alt="BlockCovid" height={theme.spacing(10)} />
            </Box>
            <Box ml={1} > 
                <Button onClick={handleOpen} variant="contained" >{user}</Button>
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
                    <List disablePadding >
                        <ListItem disableGutters>
                            <Button onClick={() => <Redirect to="/acount" />} variant="contained">
                                Acount
                            </Button>
                        </ListItem>
                        <ListItem disableGutters>
                            <Button onClick={() => <Redirect to="/logout" />} variant="contained">
                                Logout
                            </Button>
                        </ListItem>
                    </List>
                </Popover>
            </Box>
        </Grid>
    </Paper>);
}