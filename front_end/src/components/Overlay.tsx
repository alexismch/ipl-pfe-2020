import React, { useState } from "react";
import { Button, List, ListItem, Popover, Box, Grid} from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function Overlay(){
    const user = "Name to retrieve";
    const [anchorEl, setAnchorEl] = useState(null);
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

    return (
        <div className={"big-badge-promo"}>
            <div className={"big-badge-promo-content"}>
                <Grid container direction="row" alignItems="center" justify="space-between">
                    <span className={"app-title"}>BLOCKCOVID</span>
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
                            <List disablePadding>
                                <ListItem disableGutters>
                                    <Button onClick={() => history.push("/account")} variant="contained">
                                        Account
                                    </Button>
                                </ListItem>
                                <ListItem disableGutters>
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