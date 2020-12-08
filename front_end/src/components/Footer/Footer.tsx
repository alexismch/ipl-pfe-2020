import {Typography} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import React from 'react';

const useStyles = makeStyles(() =>
	createStyles({
		love: {
			position: 'relative',
			top: 3,
		},
	})
);

const Footer = () => {
	const classes = useStyles();

	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Made with '}
			<a
				href="https://www.youtube.com/watch?v=tmSzRx9RYLk"
				target="_blank"
			>
				<FavoriteBorderOutlinedIcon
					color={'primary'}
					fontSize={'small'}
					className={classes.love}
				/>
			</a>
			{' by Group 1.'}
		</Typography>
	);
};

export default Footer;
