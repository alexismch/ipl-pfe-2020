import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {useAlert} from 'contexts/Alert/AlertContext';
import {
	createNewDoctorLocation,
	getDoctorInstitutions,
} from 'components/utils/backend';

const AddLocationDialog = ({setLocations}) => {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [nameAlreadyUsed, setNameAlreadyUsed] = useState(false);

	//Error handling.
	const {sendSuccessMessage, sendWarningMessage} = useAlert();

	//Histotry
	const history = useHistory();

	const [filledFields, setFilledFields] = useState<{
		name: boolean;
		description: boolean;
	}>({
		name: true,
		description: true,
	});

	const resetErrors = () => {
		const newFields = {
			name: true,
			description: true,
		};
		setFilledFields(newFields);
		setNameAlreadyUsed(false);
	};

	const checkErrors = () => {
		const newFields = {
			name: Boolean(name),
			description: Boolean(description),
		};
		setFilledFields(newFields);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddButton = () => {
		resetErrors();
		createNewDoctorLocation(
			String(localStorage.getItem('Token')),
			name,
			description
		)
			.then(() => {
				sendSuccessMessage('Location correctly created.');
				getDoctorInstitutions(String(localStorage.getItem('Token')))
					.then((response: any) => {
						setLocations(response.data);
					})
					.catch((error): any => {
						console.log(error);
					});
			})
			.catch((error: any) => {
				console.log(error.response.status);
				if (error.response.status === 401) {
					history.push('/logout');
				} else if (error.response.status === 409) {
					sendWarningMessage('Location name already used.');
					setNameAlreadyUsed(true);
				} else if (error.response.status === 422) {
					sendWarningMessage(error.response.data.error);
					checkErrors();
				}
			});
	};

	return (
		<div className={'location-add-box'}>
			<Button
				variant="outlined"
				color="primary"
				onClick={handleClickOpen}
			>
				Add location
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Add location</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To add a location, please enter its name and a
						description.
					</DialogContentText>
					<TextField
						margin="dense"
						name="name"
						required
						fullWidth
						id="name"
						label="Name"
						autoFocus
						value={name}
						onChange={e => setName(e.target.value)}
						error={nameAlreadyUsed || !filledFields.name}
						autoComplete={'off'}
					/>
					<TextField
						margin="dense"
						name="description"
						required
						fullWidth
						id="description"
						label="Description"
						value={description}
						onChange={e => setDescription(e.target.value)}
						error={!filledFields.description}
						autoComplete={'off'}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleAddButton} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AddLocationDialog;
