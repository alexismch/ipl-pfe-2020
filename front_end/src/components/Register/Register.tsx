import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import CustomizedTabs from './Tabs';

const Register = ({setConnectedType}) => {
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={'authenticate-paper'}>
				<Avatar className={'authenticate-avatar'}>
					<LockOpenOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register
				</Typography>
				<CustomizedTabs setConnectedType={setConnectedType}/>
				<Grid container justify="center" className={'change-form-text'}>
					<Grid item>
						<Link component={RouterLink} to="/authenticate">
							Already have an account? Authenticate
						</Link>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

export default Register;
