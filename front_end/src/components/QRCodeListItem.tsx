import React  from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, createStyles,
    Grid, makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
var QRCode = require('qrcode.react');
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

const QRCodeListItem = ({id, name, description, expanded, handleChange}:any) => {
    const baseURL = "https://ipl-pfe-2020-dev-mobile.herokuapp.com/qr/l/";
    const classes = useStyles();

    return (
        <div>
            <Accordion elevation={12} expanded={expanded === id} onChange={handleChange(id)} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={id + "-content"}
                    id={id +"-header"}
                >
                    <Typography className={classes.heading}>{name}</Typography>
                    <Typography className={classes.secondaryHeading}>{description}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container alignContent={"center"}>
                        <Grid item xs={12}>
                            <Typography style={{textAlign:"center"}}>
                                <QRCode size={256} value={baseURL + id} />
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default QRCodeListItem;