import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Copyright from 'components/Copyright/Copytight';
import {AlertContext} from 'contexts/Alert/AlertContext';
import React, {useEffect, useState} from 'react';
import ConnectedSwitch from './ConnectedSwitch';
import UnconnectedSwitch from './UnconnectedSwitch';

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			margin: '0',
			padding: '0',
		},
		'.authenticate-paper': {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		'.authenticate-avatar': {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main,
		},
		'.authenticate-form': {
			width: '100%', // Fix IE 11 issue.
			marginTop: theme.spacing(3),
		},
		'.authenticate-submit': {
			margin: theme.spacing(3, 0, 2),
		},
		'.change-form-text': {
			paddingTop: '20px',
		},
	},
}));

const App = () => {
	useStyles();
	const [connectedType, setConnectedType] = useState<"" | "doctor" | "institution">("");// remember.. important... soit '', soit 'doctor', soit 'institution'

	useEffect(() => {
		if (localStorage.getItem("Token") && localStorage.getItem("Type_BlockCovid")){
			if (String(localStorage.getItem("Type_BlockCovid")) === "doctor"){
				setConnectedType("doctor");
			} else if (String(localStorage.getItem("Type_BlockCovid")) === "institution"){
				setConnectedType("institution");
			} else {
				setConnectedType("");
			}
		}
	})

	return (
		<div>
			<AlertContext>
				{connectedType ? (
					<ConnectedSwitch connectedType={connectedType} setConnectedType={setConnectedType}/>
				) : (
					<UnconnectedSwitch setConnectedType={setConnectedType}/>
				)}
				<Box mt={8}>
					<Copyright />
				</Box>
			</AlertContext>
		</div>
	);
};

export default App;
