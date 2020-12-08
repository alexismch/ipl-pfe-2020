import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React from 'react';

const AddLocationDialog = () => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
					/>
					<TextField
						margin="dense"
						name="description"
						required
						fullWidth
						id="description"
						label="Description"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AddLocationDialog;
