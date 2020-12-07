import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Authenticate from 'components/Authenticate/Authenticate';
import Register from 'components/Register/Register';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Copyright from '../Copyright/Copytight';

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	stepper: {
		backgroundColor: theme.palette.background.default,
	},
	stepperBox: {
		width: '100%',
	},
	stepperButtonsBoxStart: {
		display: 'flex !important',
		justifyContent: 'flex-start',
		marginBottom: '16px',
	},
	stepperButtonsBoxEnd: {
		display: 'flex !important',
		justifyContent: 'flex-end',
		marginBottom: '16px',
	},
	typeSelectorBox: {
		textAlign: 'center',
	},
}));

const App = () => {
	return (
		<div>
			<Switch>
				<Route path="/register">
					<Register useStyles={useStyles} />
				</Route>
				<Route path="/authenticate">
					<Authenticate useStyles={useStyles} />
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
