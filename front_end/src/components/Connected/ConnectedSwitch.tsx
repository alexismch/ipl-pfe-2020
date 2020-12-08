import Home from 'components/Connected/Home/Home';
import Logout from 'components/Connected/Logout/Logout';
import Navbar from 'components/Connected/Navbar/Navbar';
import React from 'react';
import {Helmet} from 'react-helmet';
import {Redirect, Route, Switch} from 'react-router-dom';

const ConnectedSwitch = ({connectedType, setConnectedType}) => {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route path="/home" exact>
					<Helmet>
						<title>Block COVID - Home</title>
					</Helmet>
					<Home />
					{connectedType === 'doctor' ? 'cc' : ''}
				</Route>
				<Route path="/logout" exact>
					<Logout setConnectedType={setConnectedType} />
				</Route>
				<Route path="/">
					<Redirect to="/home" />
				</Route>
			</Switch>
		</div>
	);
};

export default ConnectedSwitch;
