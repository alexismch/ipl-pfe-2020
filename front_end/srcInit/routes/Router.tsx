import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from 'front_end/srcInit/user/Login';
import Logout from 'front_end/srcInit/user/Logout';
import Register from 'front_end/srcInit/user/Register';
import Account from 'front_end/srcInit/user/Account';
import HomeDoctor from 'front_end/srcInit/components/HomeDoctor';
import HomeInstitution from 'front_end/srcInit/components/HomeInstitution';
import CodesList from 'front_end/srcInit/components/CodesList';

export default function Router() {
	const [authAsDoctor, setAuthAsDoctor] = useState(false);
	const [authAsInstitution, setAuthAsInstitution] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('Type_BlockCovid') === 'doctor') {
			setAuthAsDoctor(true);
		} else if (localStorage.getItem('Type_BlockCovid') === 'institution') {
			setAuthAsInstitution(true);
		}
	}, []);

	return (
		<BrowserRouter>
			{authAsDoctor || authAsInstitution ? (
				<Switch>
					<Route exact path="/home">
						{authAsDoctor ? <HomeDoctor /> : <HomeInstitution />}
					</Route>
					<Route exact path="/codesList">
						<CodesList />
					</Route>
					<Route exact path="/logout">
						<Logout
							authAsDoctor={authAsDoctor}
							setAuthAsDoctor={setAuthAsDoctor}
							setAuthAsInstitution={setAuthAsInstitution}
						/>
					</Route>
					<Route exact path="/account">
						<Account />
					</Route>
					<Redirect to="/home" />
				</Switch>
			) : (
				<Switch>
					<Route exact path="/login">
						<Login
							setAuthAsDoctor={setAuthAsDoctor}
							setAuthAsInstitution={setAuthAsInstitution}
						/>
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Redirect to="/login" />
				</Switch>
			)}
		</BrowserRouter>
	);
}
