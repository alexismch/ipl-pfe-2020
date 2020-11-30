import React from 'react';
import AuthRouter from 'routes/AuthRouter';
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from './Theme'

const App = () => {
        return (
                <ThemeProvider theme={theme}>        
                <AuthRouter/>
                {/* <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="top-right"
                        getState={(state) => state.toastr}
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar
                        closeOnToastrClick/> */}
                </ThemeProvider>
        )       
};

export default App