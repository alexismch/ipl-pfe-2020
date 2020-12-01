import {createMuiTheme} from "@material-ui/core/styles";

export const theme = createMuiTheme({
        palette:{
                primary: {
                        main: "#000",
                },
                secondary: {
                        main: "#BBB",
                }, 
                background:{
                        default: "#00ff9d",
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
                                color: "black",
                                margin: "0"
                        }
                },
                MuiInputBase: {
                        root: {
                                backgroundColor : "#00ff9d",
                        }
                },
                MuiButton: {
                        contained: {
                                border: "1px solid",
                                borderColor: "#000",
                                fontFamily: "Open Sans",
                                float: "right",
                                textTransform: "none",
                                backgroundColor: "#00ff9d",
                                color: "#000",
                                '&:hover': {
                                        borderColor: "#FFF",
                                },  
                        },
                        label: {
                                fontWeight: "bold"
                        }, 
                },
                MuiTextField: {
                        root: {
                                borderRadius: "4px",
                                borderStyle: "solid",
                                borderWidth: "1px"
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
                                backgroundColor: "#00ff9d",  
                                color: "#000",
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
                                backgroundColor: "#00ff9d",
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
        },
});