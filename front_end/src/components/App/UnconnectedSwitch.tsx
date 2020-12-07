import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Authenticate from 'components/Authenticate/Authenticate';
import Register from 'components/Register/Register';

const UnconnectedSwitch = () => {
	return (
		<Switch>
			<Route path="/register" exact>
				<Register />
			</Route>
			<Route path="/authenticate" exact>
				<Authenticate />
			</Route>
			<Route path="/">
				<Redirect to="/authenticate" />
			</Route>
		</Switch>
	);
};

export default UnconnectedSwitch;
