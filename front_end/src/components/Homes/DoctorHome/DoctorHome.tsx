import LocationsList from 'components/LocationsList/LocationsList';
import React from 'react';

const DoctorHome = () => {
	const locations = [
		{
			id: '1',
			title: '1 doctor',
			description: '1 description',
		},
		{
			id: '2',
			title: '2 doctor',
			description: '2 description',
		},
		{
			id: '3',
			title: '3 doctor',
			description: '3 description',
		},
	];
	return (
		<div>
			<LocationsList locations={locations} />
		</div>
	);
};

export default DoctorHome;
