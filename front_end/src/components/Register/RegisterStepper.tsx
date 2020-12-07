import {Button, Step, StepLabel, Stepper} from '@material-ui/core';
import React from 'react';
import DoctorRegister from './DoctorRegister';
import InstitutionRegister from './InstitutionRegister';
import SelectUserType from './SelectUserType';

const getSteps = () => {
	return ['Select user type', 'Complete infos'];
};

const getStepContent = (stepIndex: number, type: string, setType: Function) => {
	switch (stepIndex) {
		case 0:
			return <SelectUserType type={type} setType={setType} />;
		case 1:
			if (type === 'doctor') return <DoctorRegister />;
			return <InstitutionRegister />;
	}
};

const RegisterStepper = () => {
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
		<div className={'register-stepper-box'}>
			<Stepper
				activeStep={activeStep}
				alternativeLabel
				className={'register-stepper'}
			>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div>
				<div>
					{getStepContent(activeStep, type, setType)}
					<div
						className={
							'register-stepper-buttons-box ' +
							(activeStep === 0
								? 'register-stepper-buttons-box-end'
								: 'register-stepper-buttons-box-start')
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
