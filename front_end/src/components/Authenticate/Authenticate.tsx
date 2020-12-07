import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, {SyntheticEvent, useState} from 'react';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {SignIn} from "../utils/backend";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Authenticate = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [authFailed, setAuthFailed] = useState(false);
	const [openErrorMessage, setOpenErrorMessage] = useState(false);
	const [openWarningMessage, setOpenWarningMessage] = useState(false);
	//const isAuthenticated = false;
	//const history = useHistory();


	const handleCloseErrorMessage = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenErrorMessage(false);
	};

	const handleCloseWarningMessage = (event?: SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway'){
			return;
		}
		setOpenWarningMessage(false);
	}

	const handleSubmit = (e : any) => {
		e.preventDefault();
		SignIn(email, password)
			.then((response : any) => {
				localStorage.setItem("Token", response.data.token);
				if (response.data.type === "doctor"){
					setAuthFailed(false);
					console.log("Connected as doctor!!")
					//localStorage.setItem("Type_BlockCovid", "doctor");
					//setAuthAsDoctor(true);
				} else if (response.data.type === "institution"){
					console.log("Connected as institution!!")
					//localStorage.setItem("Type_BlockCovid", "institution");
					//setAuthAsInstitution(true);
				}
			}).catch(error => {
			console.log(error.response.status)
			if (error.response.status === 401){
				setAuthFailed(true);
				setOpenErrorMessage(true);
			} else if (error.response.status === 422) {
				setAuthFailed(true);
				setOpenWarningMessage(true);
			}
		})
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

				<form className={'authenticate-form'} noValidate onSubmit={handleSubmit}>
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
						onChange={(e) => setEmail(e.target.value)}
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
						onChange={(e) => setPassword(e.target.value)}
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
			<div>
				<Snackbar
					anchorOrigin={{vertical: 'top', horizontal: 'right'}}
					open={openErrorMessage}
					autoHideDuration={6000}
					onClose={handleCloseErrorMessage}
				>
					<Alert severity="error">Wrong E-mail or password.</Alert>
				</Snackbar>
				<Snackbar
					anchorOrigin={{vertical: 'top', horizontal: 'right'}}
					open={openWarningMessage}
					autoHideDuration={6000}
					onClose={handleCloseWarningMessage}
				>
					<Alert severity="warning">Please fill in all inputs correctly.</Alert>
				</Snackbar>
			</div>
		</Container>
	);
};

export default Authenticate;
