import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {useAlert} from 'contexts/Alert/AlertContext';
import React, {useState} from 'react';
import {institutionRegistration} from 'services/backend';

const InstitutionRegister = ({setConnectedType}) => {
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

	const [filledFields, setFilledFields] = useState<{
		name: boolean;
		email: boolean;
		password: boolean;
		repeatPassword: boolean;
		number: boolean;
	}>({
		//No errors on arrival on page.
		name: true,
		email: true,
		password: true,
		repeatPassword: true,
		number: true,
	});

	const resetErrors = () => {
		const newFields = {
			name: true,
			email: true,
			password: true,
			repeatPassword: true,
			number: true,
		};
		setFilledFields(newFields);
		setPasswordsInputErrorError(false);
		setEmailOrNoAlreadyExistsError(false);
	};

	const checkFields = () => {
		const newFields = {
			name: Boolean(institutionName),
			email: Boolean(institutionEmail),
			password: Boolean(institutionPassword),
			repeatPassword: Boolean(institutionRepeatPassword),
			number: Boolean(institutionNumber),
		};
		setFilledFields(newFields);
	};

	const handleRegisterClick = (e: any) => {
		resetErrors();
		e.preventDefault();
		if (institutionPassword === institutionRepeatPassword) {
			institutionRegistration(
				institutionName,
				institutionEmail,
				institutionPassword,
				institutionNumber
			)
				.then((response: any) => {
					localStorage.setItem('Token', response.data.token);
					localStorage.setItem('Type_BlockCovid', 'institution');
					setConnectedType('institution');
				})
				.catch(error => {
					if (error.response.status === 409) {
						sendErrorMessage(error.response.data.error);
						setEmailOrNoAlreadyExistsError(true);
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
						error={!filledFields.name}
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
						error={
							emailOrNoAlreadyExistsError || !filledFields.email
						}
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
						error={
							passwordsInputErrorError || !filledFields.password
						}
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
						error={
							passwordsInputErrorError ||
							!filledFields.repeatPassword
						}
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
						error={
							emailOrNoAlreadyExistsError || !filledFields.number
						}
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
