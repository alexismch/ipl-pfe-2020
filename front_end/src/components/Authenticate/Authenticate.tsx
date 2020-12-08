import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {SignIn} from 'components/utils/backend';
import {useAlert} from 'contexts/Alert/AlertContext';
import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';

const Authenticate = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [authFailed, setAuthFailed] = useState(false);
	const {sendErrorMessage, sendWarningMessage} = useAlert();

	//const isAuthenticated = false;
	//const history = useHistory();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		SignIn(email, password)
			.then((response: any) => {
				localStorage.setItem('Token', response.data.token);
				if (response.data.type === 'doctor') {
					setAuthFailed(false);
					console.log('Connected as doctor!!');
					//localStorage.setItem("Type_BlockCovid", "doctor");
					//setAuthAsDoctor(true);
				} else if (response.data.type === 'institution') {
					console.log('Connected as institution!!');
					//localStorage.setItem("Type_BlockCovid", "institution");
					//setAuthAsInstitution(true);
				}
			})
			.catch(error => {
				if (error.response.status === 401) {
					setAuthFailed(true);
					sendErrorMessage(error.response.data.error);
				} else if (error.response.status === 422) {
					setAuthFailed(true);
					sendWarningMessage(error.response.data.error);
				}
			});
	};

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

				<form
					className={'authenticate-form'}
					noValidate
					onSubmit={handleSubmit}
				>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						autoFocus
						error={authFailed}
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
						value={password}
						error={authFailed}
						onChange={e => setPassword(e.target.value)}
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
