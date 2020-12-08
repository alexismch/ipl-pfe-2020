import LocationsList from 'components/LocationsList/LocationsList';
import React, {useEffect, useState} from 'react';
import {getDoctorInstitutions} from 'components/utils/backend';

const DoctorHome = () => {
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

export default DoctorHome;
