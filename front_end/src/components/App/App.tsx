import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Authenticate from 'components/Authenticate/Authenticate';
import Register from 'components/Register/Register';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Copyright from 'components/Copyright/Copytight';

const useStyles = makeStyles(theme => ({
	'@global': {
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
		'.register-stepper': {
			backgroundColor: theme.palette.background.default,
		},
		'.register-stepper-box': {
			width: '100%',
		},
		'.register-stepper-buttons-box': {
			display: 'flex',
			justifyContent: 'flex-start',
			marginBottom: '16px',
		},
		'.register-stepper-buttons-box-start': {
			justifyContent: 'flex-start',
		},
		'.register-stepper-buttons-box-end': {
			justifyContent: 'flex-end',
		},
		'.register-type-selector-box': {
			textAlign: 'center',
			marginBottom: '16px',
		},
	},
}));

const App = () => {
	useStyles();

	return (
		<div>
			<Switch>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/authenticate">
					<Authenticate />
				</Route>
				<Route path="/">
					<Redirect to="/authenticate" />
				</Route>
			</Switch>
			<Box mt={8}>
				<Copyright />
			</Box>
		</div>
	);
};

export default App;
