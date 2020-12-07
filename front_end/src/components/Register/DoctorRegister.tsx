import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, {useState} from 'react';
import {doctorRegistration} from "../utils/backend";
import {useAlert} from "../../contexts/Alert/AlertContext";

const DoctorRegister = () => {
	const [doctorFirstName, setDoctorFirstName] = useState("");
	const [doctorLastName, setDoctorLastName] = useState("");
	const [doctorEmail, setDoctorEmail] = useState("");
	const [doctorPassword, setDoctorPassword] = useState("");
	const [doctorRepeatPassword, setDoctorRepeatPassword] = useState("");
	const [doctorInami, setDoctorInami] = useState("");
	const {sendErrorMessage, sendWarningMessage} = useAlert()

	const [emailAlreadyExistsError, setEmailAlreadyExistsError] = useState(false);
	const [passwordsInputErrorError, setPasswordsInputErrorError] = useState(false);

	const handleRegisterClick = (e : any) => {
		e.preventDefault();
		//Get rid of old potential error messages.
		setEmailAlreadyExistsError(false);
		setPasswordsInputErrorError(false);
		if (doctorPassword === doctorRepeatPassword){
			doctorRegistration(doctorFirstName, doctorLastName, doctorEmail, doctorPassword, doctorInami)
				.then(response => {
					console.log(response);
				}).catch(error => {
					sendErrorMessage(error.response.data.error);
					if (error.response.status === 409){
						setEmailAlreadyExistsError(true);
					}
			})
		} else {
			sendWarningMessage("The passwords do not match.");
			setPasswordsInputErrorError(true);
		}
	}



	return (
		<div>
			<form className={'authenticate-form'} noValidate onSubmit={handleRegisterClick}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							autoComplete="fname"
							name="firstName"
							variant="outlined"
							required
							fullWidth
							id="firstName"
							label="First Name"
							autoFocus
							value={doctorFirstName}
							onChange={(e) => setDoctorFirstName(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="lastName"
							label="Last Name"
							name="lastName"
							autoComplete="lname"
							value={doctorLastName}
							onChange={(e) => setDoctorLastName(e.target.value)}
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
							value={doctorEmail}
							onChange={(e) => setDoctorEmail(e.target.value)}
							error={emailAlreadyExistsError}
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
							value={doctorPassword}
							onChange={(e) => setDoctorPassword(e.target.value)}
							error={passwordsInputErrorError}
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
							value={doctorRepeatPassword}
							onChange={(e) => setDoctorRepeatPassword(e.target.value)}
							error={passwordsInputErrorError}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							name="inami"
							label="INAMI number"
							id="inami"
							autoComplete="current-password"
							value={doctorInami}
							onChange={(e) => setDoctorInami(e.target.value)}
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
		</div>
	);
};

export default DoctorRegister;
