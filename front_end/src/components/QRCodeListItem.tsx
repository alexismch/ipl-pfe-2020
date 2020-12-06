import React, { useState } from "react";
import {Button, Collapse, Paper} from "@material-ui/core";

const QRCodeListItem = () => {
    const [shown, setShown] = useState(false);


    return (
        <Paper elevation={12} style={{marginTop:"1%"}}>
            <Collapse collapsedHeight={"60px"} in={shown}>
                <Button onClick={() => setShown(!shown)} variant="contained" style={{marginTop:"1%", marginRight:"1%"}}>
                    Show
                </Button>
                <h2>Put list of QRCodes here.</h2>
                <p>This is such a beautiful test</p>
                <p>I love coding.</p>
                <p>Internship coming soon!</p>
                <p>Let's have som fun.</p>
            </Collapse>
        </Paper>
    )
}

export default QRCodeListItem;