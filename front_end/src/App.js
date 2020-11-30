import React from 'react';
import AuthRouter from './routes/AuthRouter';
import {ThemeProvider} from '@material-ui/core/styles';
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import {theme} from './Theme'

const App = () => (
        <ThemeProvider theme={theme}>        
                <AuthRouter/>
                <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="top-right"
                        getState={(state) => state.toastr}
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar
                        closeOnToastrClick/>
        </ThemeProvider>
);

export default App