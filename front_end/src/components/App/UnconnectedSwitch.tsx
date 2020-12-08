import Authenticate from 'components/Authenticate/Authenticate';
import Register from 'components/Register/Register';
import React from 'react';
import {Helmet} from 'react-helmet';
import {Redirect, Route, Switch} from 'react-router-dom';

const UnconnectedSwitch = ({setConnectedType}) => {
	return (
		<Switch>
			<Route path="/authenticate" exact>
				<Helmet>
					<title>Block COVID - Authenticate</title>
				</Helmet>
				<Authenticate setConnectedType={setConnectedType} />
			</Route>
			<Route path="/register" exact>
				<Helmet>
					<title>Block COVID - Register</title>
				</Helmet>
				<Register setConnectedType={setConnectedType} />
			</Route>
			<Route path="/">
				<Redirect to="/authenticate" />
			</Route>
		</Switch>
	);
};

export default UnconnectedSwitch;
