import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Copyright from 'components/Copyright/Copytight';
import {AlertContext} from 'contexts/Alert/AlertContext';
import React from 'react';
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
	const connectedType = 'doctor'; // soit '', soit 'doctor', soit 'institution'
	return (
		<div>
			<AlertContext>
				{connectedType ? (
					<ConnectedSwitch connectedType={connectedType} />
				) : (
					<UnconnectedSwitch />
				)}
				<Box mt={8}>
					<Copyright />
				</Box>
			</AlertContext>
		</div>
	);
};

export default App;
