import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Authenticate from 'components/Authenticate/Authenticate';
import Copyright from 'components/Copyright/Copytight';
import Register from 'components/Register/Register';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

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
		'.change-form-text': {
			paddingTop: '20px',
		},
	},
}));

const App = () => {
	useStyles();

	return (
		<div>
			<Switch>
				<Route path="/register" exact>
					<Register />
				</Route>
				<Route path="/authenticate" exact>
					<Authenticate />
				</Route>

				<Route path="/">
					<Switch>
						<Route path="/home" exact>
							<Authenticate />
						</Route>
						<Route path="/">
							<Redirect to="/home" />
						</Route>
					</Switch>
				</Route>
			</Switch>
			<Box mt={8}>
				<Copyright />
			</Box>
		</div>
	);
};

export default App;
