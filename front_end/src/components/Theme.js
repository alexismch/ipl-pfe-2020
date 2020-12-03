import {createMuiTheme} from "@material-ui/core/styles";

export const theme = createMuiTheme({
        palette:{
                primary: {
                        main: "#000000",
                },
                secondary: {
                        main: "#BBB",
                }, 
                background:{
                        default: "#4DDB63",
                        paper : "#FFF",
                },
        },
        typography: {
                fontFamily: "Open Sans",               
        },  
        shape: {
                borderRadius: 4,
        },
        overrides: {

                MuiInput: {
                        underline: {
                                color: "#000",
                                margin: "0"
                        }
                },
                MuiInputBase: {
                        root: {
                                height: "40px",
                                letterSpacing: "2px",
                                fontSize: "1em",
                                backgroundColor : "#e6e6e6",
                                '&:hover':{
                                        border: "0px",
                                },
                        },
                },
                MuiButton: {
                        contained: {
                                border: "1px solid",
                                borderColor: "#000",
                                fontFamily: "Open Sans",
                                float: "right",
                                textTransform: "none",
                                backgroundColor: "#6ccf7b",
                                color: "#595c5a",
                                '&:hover': {
                                        borderColor: "#c5ebd5",
                                        backgroundColor:"#9ef7c4"
                                },  
                        },
                        label: {
                                fontWeight: "bold"
                        }, 
                },
                MuiTextField: {
                        root: {
                                color: "#7ace86",
                                borderRadius: "4px",
                                borderStyle: "solid"
                        }
                },
                MuiTypography: {
                        subtitle1: {
                                fontWeight: "bold",
                        },
                        h5: {
                                fontWeight: "bold",
                        },
                },
                MuiDialog: {
                        paper:{
                                color: "#000",
                                backgroundColor: "#FFF",
                        },
                },
                MuiPaper: {
                        root: {
                                color: "#000",
                                backgroundColor: "#FFF",
                                borderRadius: 4,
                                elevation : 8,
                        },
                },
                MuiPopover: { 
                        paper: {
                                backgroundColor : "#FFF",
                        },
                },
                MuiListItem: {
                        root:{
                                padding: 8,
                                margin: 0,
                        },
                },
                MuiGrid: {
                        root: {
                                color: "#000",
                                padding: 8,
                                borderRadius: 4,
                        },
                },
                MuiInputLabel: {
                        root: {
                                color: "#424242",
                                letterSpacing: "2px",
                                fontSize: "1em",
                        }
                },
        },
});