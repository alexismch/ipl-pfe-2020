import Home from 'components/Connected/Home/Home';
import Logout from 'components/Connected/Logout/Logout';
import Navbar from 'components/Connected/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import {Helmet} from 'react-helmet';
import {Redirect, Route, Switch} from 'react-router-dom';
import Doctor from 'components/Connected/Doctor/Doctor';
import Institution from 'components/Connected/Institution/Institution';
import Authenticate from 'components/Unconnected/Authenticate/Authenticate';
import Register from 'components/Unconnected/Register/Register';

const Router = () => {

	const [connectedType, setConnectedType] = useState<
		'' | 'doctor' | 'institution'
	>('');

	useEffect(() => {
		if (
			localStorage.getItem('Token') &&
			localStorage.getItem('Type_BlockCovid')
		) {
			if (String(localStorage.getItem('Type_BlockCovid')) === 'doctor')
				setConnectedType('doctor');
			else if (
				String(localStorage.getItem('Type_BlockCovid')) ===
				'institution'
			)
				setConnectedType('institution');
			else setConnectedType('');
		}
	}, [setConnectedType]);
	
	if(connectedType){
		return (<div>
			<Navbar />
			<Switch>
				<Route path="/home" exact>
					<Helmet>
						<title>Block COVID - Home</title>
					</Helmet>
					{connectedType === 'doctor' ? <Doctor /> : <Institution />}
					<Home />
				</Route>
				<Route path="/logout" exact>
					<Logout setConnectedType={setConnectedType} />
				</Route>
				<Route path="/logout/e" exact>
					<Logout setConnectedType={setConnectedType} error={true} />
				</Route>
				<Route path="/">
					<Redirect to="/home" />
				</Route>
			</Switch>
		</div>)
	} else {
		return(
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
		)
	}
}
export default Router;
