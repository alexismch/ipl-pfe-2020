import DoctorHome from 'components/Homes/DoctorHome/DoctorHome';
import InstitutionHome from 'components/Homes/InstitutionHome/InstitutionHome';
import Navbar from 'components/Navbar/Navbar';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

const ConnectedSwitch = ({connectedType}) => {
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
					{
						//TODO: en attente du state
					}
					<Redirect to="/authenticate" />
				</Route>
				<Route path="/">
					<Redirect to="/home" />
				</Route>
			</Switch>
		</div>
	);
};

export default ConnectedSwitch;
