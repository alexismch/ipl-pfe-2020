import LocationsList from 'components/Connected/LocationsList/LocationsList';
import {getDoctorInstitutions} from 'services/backend';
import React, {useEffect, useState} from 'react';

const Home = () => {
	const [locations, setLocations] = useState([]);

	useEffect(() => {
		getDoctorInstitutions(String(localStorage.getItem('Token')))
			.then((response: any) => {
				setLocations(response.data);
			})
			.catch((error): any => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<LocationsList
				locations={locations}
				getDoctorInstitutions={getDoctorInstitutions}
				setLocations={setLocations}
			/>
		</div>
	);
};

export default Home;
