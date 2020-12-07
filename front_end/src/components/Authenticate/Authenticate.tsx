import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

const Authenticate = () => {
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={'authenticate-paper'}>
				<Avatar className={'authenticate-avatar'}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Authenticate
				</Typography>
				<form className={'authenticate-form'} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={'authenticate-submit'}
					>
						Authenticate
					</Button>
					<Grid
						container
						justify="center"
						className={'change-form-text'}
					>
						<Grid item>
							<Link component={RouterLink} to="/register">
								Don't have an account yet? Register
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default Authenticate;
