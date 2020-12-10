import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import App from 'components/App/App';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import themeJson from 'theme.json';

const {REACT_APP_QR_CODE_BASE_URL} = process.env;
let missingEnvVars: string[] = [];

if (!REACT_APP_QR_CODE_BASE_URL) {
	missingEnvVars = [...missingEnvVars, 'REACT_APP_QR_CODE_BASE_URL'];
}

const theme = createMuiTheme(themeJson);

// if (missingEnvVars.length > 0) {
// 	ReactDOM.render(
// 		<div style={{color: 'red', padding: '20px'}}>
// 			<h1>Environments variables are missing.</h1>
// 			<p>
// 				To fix this issue you can create a '.env' file at the root of
// 				the project and restart your application.
// 			</p>
// 			<p>The following variables are missing:</p>
// 			<ul>
// 				{missingEnvVars.map(envVar => (
// 					<li key={envVar}>{envVar}</li>
// 				))}
// 			</ul>
// 		</div>,
// 		document.getElementById('root')
// 	);
// } else {
	ReactDOM.render(
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MuiThemeProvider>,
		document.getElementById('root')
	);
// }
