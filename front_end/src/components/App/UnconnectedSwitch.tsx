import Authenticate from 'components/Authenticate/Authenticate';
import Register from 'components/Register/Register';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

const UnconnectedSwitch = ({setConnectedType}) => {
	return (
		<Switch>
			<Route path="/register" exact>
				<Register setConnectedType={setConnectedType}/>
			</Route>
			<Route path="/authenticate" exact>
				<Authenticate setConnectedType={setConnectedType}/>
			</Route>
			<Route path="/">
				<Redirect to="/authenticate" />
			</Route>
		</Switch>
	);
};

export default UnconnectedSwitch;
