import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';

const InstitutionRegister = () => {
	return (
		<form className={'authenticate-form'} noValidate>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						autoComplete="fname"
						name="firstName"
						variant="outlined"
						required
						fullWidth
						id="firstName"
						label="Institution name"
						autoFocus
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						variant="outlined"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						variant="outlined"
						required
						fullWidth
						name="repeatPassword"
						label="Repeat password"
						type="password"
						id="repeatPassword"
						autoComplete="current-password"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						required
						fullWidth
						name="no"
						label="Institution number"
						id="no"
						autoComplete="current-password"
					/>
				</Grid>
			</Grid>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={'authenticate-submit'}
			>
				Register
			</Button>
		</form>
	);
};

export default InstitutionRegister;
