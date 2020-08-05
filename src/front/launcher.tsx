import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './containers/app';
import store from './store';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: cyan[700]
        },
        secondary: {
            main: grey[300],
            light: grey[50]
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ThemeProvider>,
    document.querySelector('#root')
);