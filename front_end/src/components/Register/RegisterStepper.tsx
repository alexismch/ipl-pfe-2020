import {Button, Step, StepLabel, Stepper, Typography} from '@material-ui/core';
import React from 'react';
import DoctorRegister from './DoctorRegister';
import InstitutionRegister from './InstitutionRegister';
import SelectUserType from './SelectUserType';

const getSteps = () => {
	return ['Select user type', 'Complete infos'];
};

const getStepContent = (
	useStyles,
	stepIndex: number,
	type: string,
	setType: Function
) => {
	switch (stepIndex) {
		case 0:
			return (
				<SelectUserType
					useStyles={useStyles}
					type={type}
					setType={setType}
				/>
			);
		case 1:
			if (type === 'doctor')
				return <DoctorRegister useStyles={useStyles} />;
			return <InstitutionRegister useStyles={useStyles} />;
	}
};

const RegisterStepper = ({useStyles}) => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();
	const [type, setType] = React.useState('');

	const handleNext = () => {
		if (type !== '') setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	return (
		<div className={classes.stepperBox}>
			<Stepper
				activeStep={activeStep}
				alternativeLabel
				className={classes.stepper}
			>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div>
				<div>
					<Typography className={classes.instructions}>
						{getStepContent(useStyles, activeStep, type, setType)}
					</Typography>
					<div
						className={
							activeStep === 0
								? classes.stepperButtonsBoxEnd
								: classes.stepperButtonsBoxStart
						}
					>
						{activeStep === 0 ? (
							<Button
								disabled={activeStep === steps.length - 1}
								variant="contained"
								color="primary"
								onClick={handleNext}
							>
								Next
							</Button>
						) : (
							<Button
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.backButton}
							>
								Back
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterStepper;
