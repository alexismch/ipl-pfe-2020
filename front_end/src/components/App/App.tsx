import {makeStyles} from '@material-ui/core/styles';
import Authenticate from 'components/Authenticate/Authenticate';
import Register from 'components/Register/Register';
import React from 'react';
import {Route, Switch} from 'react-router-dom';

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
}));

const App = () => {
	return (
		<div>
			<Switch>
				<Route path="/register">
					<Register useStyles={useStyles} />
				</Route>
				<Route path="/">
					<Authenticate useStyles={useStyles} />
				</Route>
			</Switch>
		</div>
	);
};

export default App;
