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
                                letterSpacing: "2px",
                                fontSize: "1.8em",
                                backgroundColor : "#c5ebd5",
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
                                backgroundColor: "#4DDB63",
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
                                color: "#595c5a",
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
                MuiAlert: {
                        root: {
                                backgroundColor: "#4DDB63",
                                color: "#595c5a",
                                padding: 0,
                                paddingLeft: 8,
                                paddingRight: 8,
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
                                padding : 8,
                                elevation : 8,
                        },
                },
                MuiPopover: { 
                        paper: {
                                backgroundColor: "#4DDB63",
                                borderRadius: 4,
                                paddingTop: 16
                        },
                },
                MuiListItem: {
                        root:{
                                padding: 0,
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
                                color: "#595c5a",
                                letterSpacing: "4px",
                                fontSize: "1.2em",
                        }
                },
        },
});