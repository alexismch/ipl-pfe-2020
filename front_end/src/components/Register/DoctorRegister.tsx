import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {doctorRegistration} from 'components/utils/backend';
import {useAlert} from 'contexts/Alert/AlertContext';
import React, {useState} from 'react';

const DoctorRegister = ({setConnectedType}) => {
	const [doctorFirstName, setDoctorFirstName] = useState('');
	const [doctorLastName, setDoctorLastName] = useState('');
	const [doctorEmail, setDoctorEmail] = useState('');
	const [doctorPassword, setDoctorPassword] = useState('');
	const [doctorRepeatPassword, setDoctorRepeatPassword] = useState('');
	const [doctorInami, setDoctorInami] = useState('');
	const {sendErrorMessage, sendWarningMessage} = useAlert();

	const [emailAlreadyExistsError, setEmailAlreadyExistsError] = useState(false);
	const [passwordsInputErrorError, setPasswordsInputErrorError] = useState(false);

	const [filledFields, setFilledFields] = useState<{
		'firstName': boolean,
		'lastName':boolean,
		'email':boolean,
		'password': boolean,
		'repeatPassword':boolean,
		'inami':boolean
	}>({ //No errors on arrival on page.
		'firstName': true,
		'lastName':true,
		'email':true,
		'password': true,
		'repeatPassword':true,
		'inami':true
	})

	const resetErrors = () => {
		const newFields= {
			'firstName': true,
			'lastName':true,
			'email':true,
			'password': true,
			'repeatPassword':true,
			'inami':true
		}
		setFilledFields(newFields);
		setPasswordsInputErrorError(false);
		setEmailAlreadyExistsError(false)
	}

	const checkFields = () => {
		const newFields= {
			'firstName': Boolean(doctorFirstName),
			'lastName':Boolean(doctorLastName),
			'email':Boolean(doctorEmail),
			'password': Boolean(doctorPassword),
			'repeatPassword':Boolean(doctorRepeatPassword),
			'inami':Boolean(doctorInami)
		}
		setFilledFields(newFields);
	}

	const handleRegisterClick = (e: any) => {
		resetErrors();
		e.preventDefault();
		if (doctorPassword === doctorRepeatPassword) {
			doctorRegistration(
				doctorFirstName,
				doctorLastName,
				doctorEmail,
				doctorPassword,
				doctorInami
			)
				.then((response:any) => {
					localStorage.setItem('Token', response.data.token);
					localStorage.setItem("Type_BlockCovid", "doctor");
					setConnectedType("doctor");
				})
				.catch(error => {
					if (error.response.status === 409) {
						setEmailAlreadyExistsError(true);
						sendErrorMessage(error.response.data.error);
					} else {
						checkFields();
						sendWarningMessage(error.response.data.error);
					}
				});
		} else {
			sendWarningMessage('The passwords do not match.');
			setPasswordsInputErrorError(true);
		}
	};

	return (
		<div>
			<form
				className={'authenticate-form'}
				noValidate
				onSubmit={handleRegisterClick}
			>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							autoComplete="off"
							name="firstName"
							variant="outlined"
							required
							fullWidth
							id="firstName"
							label="First Name"
							autoFocus
							error={!filledFields.firstName}
							value={doctorFirstName}
							onChange={e => setDoctorFirstName(e.target.value)}
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
							autoComplete="off"
							value={doctorLastName}
							error={!filledFields.lastName}
							onChange={e => setDoctorLastName(e.target.value)}
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
							type="email"
							autoComplete="off"
							value={doctorEmail}
							onChange={e => setDoctorEmail(e.target.value)}
							error={emailAlreadyExistsError  || !filledFields.email}
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
							autoComplete="off"
							value={doctorPassword}
							onChange={e => setDoctorPassword(e.target.value)}
							error={passwordsInputErrorError  || !filledFields.password}
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
							autoComplete="off"
							value={doctorRepeatPassword}
							onChange={e =>
								setDoctorRepeatPassword(e.target.value)
							}
							error={passwordsInputErrorError  || !filledFields.repeatPassword}
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
							autoComplete="off"
							value={doctorInami}
							onChange={e => setDoctorInami(e.target.value)}
							error={!filledFields.inami}
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
