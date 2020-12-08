import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {breakpoints, compose, palette, spacing} from '@material-ui/system';
import React from 'react';
import styled from 'styled-components';
import AddLocationDialog from './AddLocationDialog';
import Location from './Location';
import {getDoctorInstitutions} from "../utils/backend";

const Box = styled.div`
	${breakpoints(compose(spacing, palette))}
`;

const useStyles = makeStyles(theme => ({
	'@global': {
		'.location-heading': {
			fontSize: theme.typography.pxToRem(15),
			flexBasis: '33.33%',
			flexShrink: 0,
		},
		'.location-secondary-heading': {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
		'.location-add-box': {
			display: 'flex',
			justifyContent: 'flex-end',
			marginBottom: 15,
		},
		'.no-location-paper': {
			minHeight: 48,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	},

}));

const LocationsList = ({locations, setLocations}:any) => {
	useStyles();
	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange = (panel: string) => (
		event: React.ChangeEvent<{}>,
		isExpanded: boolean
	) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<Box
			mt={8}
			xs={{paddingLeft: 0, paddingRight: 0}}
			sm={{paddingLeft: 4, paddingRight: 4}}
			md={{paddingLeft: 8, paddingRight: 8}}
		>
			<AddLocationDialog setLocations={setLocations}/>
			{locations.length > 0 ? (
				locations.map(location => (
					<Location
						key={location.id}
						id={location.id}
						title={location.name}
						description={location.description}
						expanded={expanded}
						handleChange={handleChange}
					/>
				))
			) : (
				<Paper className={'no-location-paper'}>
					<Typography variant="h5">No location found</Typography>
				</Paper>
			)}
		</Box>
	);
};

export default LocationsList;
