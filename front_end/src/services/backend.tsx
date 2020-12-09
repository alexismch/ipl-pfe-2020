import Axios from 'axios';

export function doctorRegistration(
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	inami: string
) {
	const data = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password,
		inami: inami,
	};

	return new Promise((resolve, reject) => {
		Axios.post('/api/doctors', data)
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function institutionRegistration(
	name: string,
	email: string,
	password: string,
	no: string
) {
	const data = {
		name: name,
		email: email,
		password: password,
		no: no,
	};

	return new Promise((resolve, reject) => {
		Axios.post('/api/institutions', data)
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function SignIn(email: string, password: string) {
	const data = {
		email,
		password,
	};

	return new Promise((resolve, reject) => {
		Axios.post('/api/authenticate', data)
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function getCurrentDoctorData(token: string) {
	const data = {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	};

	return new Promise((resolve, reject) => {
		Axios.get('/api/doctors/me', data)
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function getLocations(token: string) {
	const data = {
		headers: {
			authorization: 'Bearer ' + token,
		},
	};

	return new Promise((resolve, reject) => {
		Axios.get('/api/locations', data)
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function createNewDoctorLocation(
	token: string,
	locationName: string,
	locationDescription: string
) {
	const data = {
		name: locationName,
		description: locationDescription,
	};

	const config = {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	};

	return new Promise<any>((resolve, reject) => {
		Axios.post('/api/locations', data, config)
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
}
