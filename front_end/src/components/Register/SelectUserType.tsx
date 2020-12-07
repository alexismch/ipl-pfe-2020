import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import React from 'react';

const SelectUserType = ({useStyles, type, setType}) => {
	const classes = useStyles();
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setType((event.target as HTMLInputElement).value);
	};

	return (
		<div className={classes.typeSelectorBox}>
			<FormControl component="fieldset">
				<FormLabel component="legend">
					I'm registering in as :{' '}
				</FormLabel>
				<RadioGroup
					aria-label="type"
					name="type"
					value={type}
					onChange={handleChange}
				>
					<FormControlLabel
						value="doctor"
						control={<Radio />}
						label="A Doctor"
					/>
					<FormControlLabel
						value="institution"
						control={<Radio />}
						label="An Institution"
					/>
				</RadioGroup>
			</FormControl>
		</div>
	);
};

export default SelectUserType;
