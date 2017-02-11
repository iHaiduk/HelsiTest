/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Park from './parks';
import Info from './list';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500
    }
});

@connect((store) => store)
class Parks extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Park />
                    <Info />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Parks;
