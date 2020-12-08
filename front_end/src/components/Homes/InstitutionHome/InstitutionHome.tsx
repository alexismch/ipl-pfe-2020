import LocationsList from 'components/LocationsList/LocationsList';
import React from 'react';

const InstitutionHome = () => {
	const locations = [
		{
			id: '1',
			title: '1 institution',
			description: '1 description',
		},
		{
			id: '2',
			title: '2 institution',
			description: '2 description',
		},
		{
			id: '3',
			title: '3 institution',
			description: '3 description',
		},
	];
	return <LocationsList locations={locations} />;
};

export default InstitutionHome;
