import {useAlert} from 'contexts/Alert/AlertContext';
import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const Logout = ({setConnectedType, error = false}) => {
	const {sendSuccessMessage, sendErrorMessage} = useAlert();
	useEffect(() => {
		localStorage.removeItem('Token');
		localStorage.removeItem('Type_BlockCovid');
		setConnectedType('');
		if (!error) sendSuccessMessage('You have been logged out.');
		else
			sendErrorMessage('Something went wrong, you have been logged out.');
	}, [setConnectedType, error, sendErrorMessage, sendSuccessMessage]);
	return <Redirect to="/authenticate" />;
};

export default Logout;
