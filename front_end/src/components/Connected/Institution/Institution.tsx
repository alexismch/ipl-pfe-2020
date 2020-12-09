import {CircularProgress} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import {makeStyles} from '@material-ui/core/styles';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {getCurrentInstitutionData} from 'services/backend';
import IInstitution from './IInstitution';

const useStyles = makeStyles(theme => ({
	'@global': {
		'.institution-box': {
			maxWidth: 345,
			marginLeft: 'auto',
			marginRight: 'auto',
			marginTop: 64,
		},
		'.institution-avatar': {
			backgroundColor: theme.palette.primary.main,
		},
		'.institution-waiting-box': {
			display: 'flex',
		},
		'.institution-waiting': {
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
}));

const Institution = () => {
	const history = useHistory();
	const [institution, setInstitution] = useState<IInstitution | null>(null);

	useEffect(() => {
		getCurrentInstitutionData(String(localStorage.getItem('Token')))
			.then((response: any) => {
				setInstitution(response.data);
			})
			.catch((error): any => {
				if (error.response.status === 401) {
					history.push('/logout/e');
				}
			});
	}, [history]);

	useStyles();

	return (
		<Card className={'institution-box'}>
			<CardHeader
				avatar={
					<Avatar
						aria-label="recipe"
						className={'institution-avatar'}
					>
						<BusinessOutlinedIcon />
					</Avatar>
				}
				title={`${institution?.institution_name ?? ''}`}
				subheader={`${institution?.institution_no ?? ''}`}
			/>
			{!institution ? (
				<CardMedia className={'institution-waiting-box'}>
					<CircularProgress className={'institution-waiting'} />
				</CardMedia>
			) : (
				''
			)}
		</Card>
	);
};

export default Institution;
