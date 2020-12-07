import React, {useState} from 'react'
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import {createCtx} from "../utils";

const [useAlert, CtxProvider] = createCtx<{sendErrorMessage:(message:string) => void , sendWarningMessage:(message:string) => void}>()

const AlertContext = ({children}) => { //Context provider.
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<"warning" | "success" | "info" | "error">("warning");

    const handleClose = () =>{
        setIsOpen(false);
    }

    const sendErrorMessage = (message:string) => {
        setIsOpen(true);
        setMessage(message)
        setType("error");
    }

    const sendWarningMessage = (message:string) => {
        setIsOpen(true);
        setMessage(message)
        setType("warning");
    }

    const exposed = {
        sendErrorMessage,
        sendWarningMessage
    }

    return (
        <CtxProvider value={exposed}>
            {children}
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity={type}>{message}</Alert>
            </Snackbar>
        </CtxProvider>
    );
}

export {useAlert, AlertContext}