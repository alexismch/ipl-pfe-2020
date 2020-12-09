import {
	AccordionActions,
	Button,
	Divider,
	makeStyles,
	useTheme,
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import canvasToImage from 'canvas-to-image';
import React from 'react';
import ReactToPrint from 'react-to-print';

const QRCode = require('qrcode.react');
const {REACT_APP_QR_CODE_BASE_URL} = process.env;
const QR_LOCATION_BASE_URL = `${REACT_APP_QR_CODE_BASE_URL}/l/`;

const useStyles = makeStyles(() => ({
	'@global': {
		'@media print': {
			'.print-box': {
				background: 'none',
				border: 'none',
				boxShadow: 'none',
			},
			'.MuiIconButton-label': {
				display: 'none',
			},
			'.print-hidden': {
				display: 'none',
			},
		},
	},
}));

const Location = ({id, title, description, expanded, handleChange}) => {
	useStyles();
	const theme = useTheme();
	const value = QR_LOCATION_BASE_URL + id;
	let componentRef;

	const handleSave = () => {
		canvasToImage(`qrcode-${id}`, {name: title, type: 'jpg'});
	};

	return (
		<Accordion
			expanded={expanded === id}
			onChange={handleChange(id)}
			ref={el => (componentRef = el)}
			className={'print-box'}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1bh-content"
				id="panel1bh-header"
			>
				<Typography className={'location-heading'}>{title}</Typography>
				<Typography className={'location-secondary-heading'}>
					{description}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<QRCode
					size={256}
					value={value}
					bgColor={theme.palette.background.paper}
					style={{marginLeft: 'auto', marginRight: 'auto'}}
					includeMargin={true}
					id={`qrcode-${id}`}
				/>
			</AccordionDetails>
			<Divider className={'print-hidden'} />
			<AccordionActions className={'print-hidden'}>
				<ReactToPrint
					trigger={() => (
						<Button size="small" color="primary">
							Print
						</Button>
					)}
					content={() => componentRef}
					documentTitle={title}
				/>
				<Button size="small" color="primary" onClick={handleSave}>
					Save
				</Button>
			</AccordionActions>
		</Accordion>
	);
};

export default Location;
