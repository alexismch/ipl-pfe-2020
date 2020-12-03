import React from 'react';
import AuthRouter from 'routes/AuthRouter';
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from './Theme'

const App = () => {
        return (
                <ThemeProvider theme={theme}>        
                        <AuthRouter/>
                </ThemeProvider>
        )       
};

export default App