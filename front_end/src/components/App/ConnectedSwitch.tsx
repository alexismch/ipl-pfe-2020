import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LocationsList from 'components/LocationsList/LocationsList';
import Navbar from 'components/Navbar/Navbar';

const ConnectedSwitch = ({connectedType}) => {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route path="/home" exact>
					<LocationsList />
				</Route>
				<Route path="/">
					<Redirect to="/home" />
				</Route>
			</Switch>
		</div>
	);
};

export default ConnectedSwitch;
