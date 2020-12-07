import {makeStyles} from '@material-ui/core/styles';
import {breakpoints, compose, palette, spacing} from '@material-ui/system';
import React from 'react';
import styled from 'styled-components';
import Location from './Location';

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
	},
}));

const LocationsList = () => {
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
			<Location
				id={'1'}
				title={'coucou'}
				description={'toi'}
				expanded={expanded}
				handleChange={handleChange}
			/>
			<Location
				id={'2'}
				title={'wesh'}
				description={'alors'}
				expanded={expanded}
				handleChange={handleChange}
			/>
			<Location
				id={'3'}
				title={'smah'}
				description={'si'}
				expanded={expanded}
				handleChange={handleChange}
			/>
		</Box>
	);
};

export default LocationsList;
