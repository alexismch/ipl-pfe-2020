import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const Logout = ({setConnectedType}) => {
	localStorage.removeItem('Token');
	localStorage.removeItem('Type_BlockCovid');
	useEffect(() => {
		setConnectedType('');
	}, [setConnectedType]);
	return <Redirect to="/authenticate" />;
};

export default Logout;
