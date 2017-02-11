/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500
    }
});

@connect((store) => {
    return {
        parking: store.parking
    };
})
class Hello extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        parking: PropTypes.shape({
            busy: PropTypes.shape({
                track: PropTypes.array,
                disabled: PropTypes.array,
                sedan: PropTypes.array
            }),
            all: PropTypes.shape({
                track: PropTypes.number,
                disabled: PropTypes.number,
                sedan: PropTypes.number
            })
        })
    };

    constructor (props, context) {
        super(props, context);
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    handleTouchTap (index) {
        this.props.dispatch({ type: 'ADD_CAR', car: index });
    }

    render () {
        const { busy, all } = this.props.parking;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="cars">
                    <List>
                        <Subheader>Cars for parking</Subheader>
                        <ListItem
                            onTouchTap={this.handleTouchTap.bind(this, 0)}
                            primaryText="Disabled"
                        />
                        <ListItem
                            onTouchTap={this.handleTouchTap.bind(this, 1)}
                            primaryText="Track"
                        />
                        <ListItem
                            onTouchTap={this.handleTouchTap.bind(this, 2)}
                            primaryText="Sedan"
                        />
                    </List>
                    <List>
                        <Subheader>Info of busy</Subheader>
                        {Object.keys(busy).map((type) => (
                            <ListItem
                                primaryText={`${type}: ${busy[type].length} / ${all[type]}`}
                            />
                        ))}
                    </List>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Hello;
