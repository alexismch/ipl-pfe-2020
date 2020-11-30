import {createMuiTheme} from "@material-ui/core/styles";

export const theme = createMuiTheme({
        palette:{
                primary: {
                        main: "#FFF",
                },
                secondary: {
                        main: "#BBB",
                }, 
                error: {
                        main: "#e27b7b",
                },
                info: {
                        main: "#85bcd6",
                },
                success: {
                        main: "#78c378",
                },
                background:{
                        default: "#222930",
                        primary: "#3d4a57",
                        secondary: "#2d3640",
                        paper : "#5d6a77",
                },
        },
        typography: {
                fontFamily:{
                        fontFamily: "Open Sans",
                },                
        },  
        shape: {
                borderRadius: 4,
        },
        zIndex: 10,
        overrides: {
                MuiInput: {
                        underline: {
                                color: "white",
                                margin: "0",
                                '&:before': {
                                        content:""
                                },
                                '&:after': {
                                        content:""
                                }
                        }
                },
                MuiInputBase: {
                        root: {
                                padding:"5px 10px",
                        }
                },
                MuiAutocomplete: {
                        endAdornment: {
                                paddingRight: "10px"
                        },
                        inputRoot: {
                                paddingRight:"40px !important",
                                paddingBottom:"7px !important"
                        },
                        clearIndicator: {
                                marginRight:"2px"
                        },
                        noOptions: {
                                color: "white"
                        }
                },
                MuiButton: {
                        contained: {
                                border: "1px solid",
                                borderColor: "#BBB",
                                fontFamily: "Open Sans",
                                float: "right",
                                textTransform: "none",
                                backgroundColor: "#3d4a57",
                                color: "#FFF",
                                '&:hover': {
                                        backgroundColor: "#5d6a77",
                                        borderColor: "#FFF",
                                },  
                        },
                        label: {
                                fontWeight: "bold"
                        }, 
                },
                MuiTextField: {
                        root: {
                                backgroundColor: "#222930",
                                borderColor: "hsl(0,0%,80%)",
                                borderRadius: "4px",
                                borderStyle: "solid",
                                borderWidth: "1px"
                        }
                },
                MuiIconButton: {
                        root: {
                                color: "#FFF",
                                border: "1px solid",
                                backgroundColor: "#3d4a57",
                                borderColor: "#BBB",
                                width: 38,
                                height: 38,
                                '&:hover': {
                                        backgroundColor: "#5d6a77",
                                        borderColor: "#FFF",
                                }, 
                        },
                },
                MuiTypography: {
                        root: {
                                color: "#FFF",
                        },
                        subtitle1: {
                                fontWeight: "bold",
                        },
                        h5: {
                                fontWeight: "bold",
                        },
                },
                MuiAlert: {
                        root: {
                                backgroundColor: "#222930",  
                                color: "#FFF",
                                padding: 0,
                                paddingLeft: 8,
                                paddingRight: 8,
                        },
                        standardInfo: {
                                backgroundColor: "#222930",  
                                color: "#FFF",
                        },
                },
                MuiDialog: {
                        paper:{
                                color: "#FFF",
                                backgroundColor: "#222930",
                        },
                },
                MuiPaper: {
                        root: {
                                color: "#FFF",
                                backgroundColor: "#3d4a57",
                                borderRadius: 4,
                                padding : 8,
                                elevation : 8,
                        },
                },
                MuiPopover: { 
                        paper: {
                                backgroundColor: "#3d4a57",
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
                                color: "#FFF",
                                padding: 8,
                                borderRadius: 4,
                        },
                },
        },
});