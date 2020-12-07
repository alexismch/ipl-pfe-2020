import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import CustomizedTabs from './Tabs';

const Register = ({useStyles}) => {
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register
				</Typography>
				<CustomizedTabs useStyles={useStyles} />
				<Grid container justify="center">
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
