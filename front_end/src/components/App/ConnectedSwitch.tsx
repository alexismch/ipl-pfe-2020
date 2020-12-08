import DoctorHome from 'components/Homes/DoctorHome/DoctorHome';
import InstitutionHome from 'components/Homes/InstitutionHome/InstitutionHome';
import Navbar from 'components/Navbar/Navbar';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Logout from 'components/Logout/Logout';

const ConnectedSwitch = ({connectedType, setConnectedType}) => {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route path="/home" exact>
					{connectedType === 'doctor' ? (
						<DoctorHome />
					) : (
						<InstitutionHome />
					)}
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
