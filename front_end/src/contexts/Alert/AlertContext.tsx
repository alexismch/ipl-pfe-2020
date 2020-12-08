import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from '@material-ui/lab';
import {createCtx} from 'contexts/utils';
import React, {useEffect, useState} from 'react';

const [useAlert, CtxProvider] = createCtx<{
	sendErrorMessage: (message: string) => void;
	sendWarningMessage: (message: string) => void;
}>();

export interface SnackbarMessage {
	message: string;
	type: 'warning' | 'success' | 'info' | 'error';
	key: number;
}

export interface State {
	open: boolean;
	snackPack: SnackbarMessage[];
	messageInfo?: SnackbarMessage;
}

const AlertContext = ({children}) => {
	//Context provider.
	const [isOpen, setIsOpen] = useState(false);
	const [snackPack, setSnackPack] = React.useState<SnackbarMessage[]>([]);
	const [messageInfo, setMessageInfo] = React.useState<
		SnackbarMessage | undefined
	>(undefined);

	useEffect(() => {
		if (snackPack.length && !messageInfo) {
			// Set a new snack when we don't have an active one
			setMessageInfo({...snackPack[0]});
			setSnackPack(prev => prev.slice(1));
			setIsOpen(true);
		} else if (snackPack.length && messageInfo && isOpen) {
			// Close an active snack when a new one is added
			setIsOpen(false);
		}
	}, [snackPack, messageInfo, isOpen]);

	const handleClick = (message: string, type) => {
		setSnackPack(prev => [
			...prev,
			{message, type, key: new Date().getTime()},
		]);
	};

	const handleClose = (
		event: React.SyntheticEvent | MouseEvent,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setIsOpen(false);
	};

	const handleExited = () => {
		setMessageInfo(undefined);
	};

	const sendErrorMessage = (message: string) => {
		handleClick(message, 'error');
	};

	const sendWarningMessage = (message: string) => {
		handleClick(message, 'warning');
	};

	const exposed = {
		sendErrorMessage,
		sendWarningMessage,
	};

	return (
		<CtxProvider value={exposed}>
			{children}
			<Snackbar
				key={messageInfo ? messageInfo.key : undefined}
				anchorOrigin={{vertical: 'top', horizontal: 'right'}}
				open={isOpen}
				autoHideDuration={6000}
				onClose={handleClose}
				onExited={handleExited}
			>
				<Alert severity={messageInfo ? messageInfo.type : undefined}>
					{messageInfo ? messageInfo.message : undefined}
				</Alert>
			</Snackbar>
		</CtxProvider>
	);
};

export {useAlert, AlertContext};
