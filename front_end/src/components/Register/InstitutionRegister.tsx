import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {institutionRegistration} from 'components/utils/backend';
import {useAlert} from 'contexts/Alert/AlertContext';
import React, {useState} from 'react';

const InstitutionRegister = () => {
	const [institutionName, setInstitutionName] = useState('');
	const [institutionEmail, setInstitutionEmail] = useState('');
	const [institutionPassword, setInstitutionPassword] = useState('');
	const [institutionRepeatPassword, setInstitutionRepeatPassword] = useState(
		''
	);
	const [institutionNumber, setInstitutionNumber] = useState('');

	const [
		emailOrNoAlreadyExistsError,
		setEmailOrNoAlreadyExistsError,
	] = useState(false);
	const [passwordsInputErrorError, setPasswordsInputErrorError] = useState(
		false
	);

	const {sendErrorMessage, sendWarningMessage} = useAlert();

	const handleRegisterClick = (e: any) => {
		e.preventDefault();
		//Get rid of old potential error messages.
		setEmailOrNoAlreadyExistsError(false);
		setPasswordsInputErrorError(false);
		if (institutionPassword === institutionRepeatPassword) {
			institutionRegistration(
				institutionName,
				institutionEmail,
				institutionPassword,
				institutionNumber
			)
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					if (error.response.status === 409) {
						sendErrorMessage(error.response.data.error);
						setEmailOrNoAlreadyExistsError(true);
					} else sendWarningMessage(error.response.data.error);
				});
		} else {
			sendWarningMessage('The passwords do not match.');
			setPasswordsInputErrorError(true);
		}
	};

	return (
		<form
			className={'authenticate-form'}
			noValidate
			onSubmit={handleRegisterClick}
		>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						autoComplete={'off'}
						name="firstName"
						variant="outlined"
						required
						fullWidth
						id="firstName"
						label="Institution name"
						autoFocus
						value={institutionName}
						onChange={e => setInstitutionName(e.target.value)}
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
						autoComplete={'off'}
						value={institutionEmail}
						onChange={e => setInstitutionEmail(e.target.value)}
						error={emailOrNoAlreadyExistsError}
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
						autoComplete={'off'}
						value={institutionPassword}
						onChange={e => setInstitutionPassword(e.target.value)}
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
						autoComplete={'off'}
						value={institutionRepeatPassword}
						onChange={e =>
							setInstitutionRepeatPassword(e.target.value)
						}
						error={passwordsInputErrorError}
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
						autoComplete={'off'}
						value={institutionNumber}
						onChange={e => setInstitutionNumber(e.target.value)}
						error={emailOrNoAlreadyExistsError}
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
