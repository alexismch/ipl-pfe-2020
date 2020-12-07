import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import App from 'components/App/App';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import themeJson from 'theme.json';

const theme = createMuiTheme(themeJson);

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</MuiThemeProvider>,
	document.getElementById('root')
);
