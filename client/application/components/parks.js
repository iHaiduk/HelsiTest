/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
class Park extends Component {

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
            }),
            notFree: PropTypes.bool
        })
    };

    constructor (props, context) {
        super(props, context);

        this.handleClose = this.handleClose.bind(this);
        this.removeCar = this.removeCar.bind(this);

        this.state = {
            fixedHeader: true,
            fixedFooter: false,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '100%'
        };
    }

    handleClose () {
        this.props.dispatch({ type: 'CLOSE_MODAL' });
    }

    removeCar (parkType, index) {
        this.props.dispatch({ type: 'REMOVE_CAR', parkType, index });
    }

    rowData (parkType) {
        const rows = [];
        const length = this.props.parking.all[parkType];
        const lengthFree = this.props.parking.busy[parkType];
        for (let i = 0; i < length; i++) {
            rows.push((<TableRow key={`${parkType}_${i}`} onTouchTap={this.removeCar.bind(this, parkType, i)}>
                <TableRowColumn>Park place for <strong>{parkType}</strong>: #{i}</TableRowColumn>
                <TableRowColumn>{parkType}</TableRowColumn>
                <TableRowColumn>{lengthFree[i] || 'Free'}</TableRowColumn>
            </TableRow>));
        }

        return rows;
    }

    render () {
        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.handleClose}
            />
        ];

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="parks">
                    <Table
                        height={this.state.height}
                        fixedHeader={this.state.fixedHeader}
                        fixedFooter={this.state.fixedFooter}
                        selectable={this.state.selectable}
                        multiSelectable={this.state.multiSelectable}
                    >
                        <TableHeader
                            displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                            enableSelectAll={this.state.enableSelectAll}
                        >
                            <TableRow>
                                <TableHeaderColumn colSpan="3" tooltip="Parking places" style={{ textAlign: 'center' }}>
                                    Parking places
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn tooltip="The ID">Number</TableHeaderColumn>
                                <TableHeaderColumn tooltip="The type">Type</TableHeaderColumn>
                                <TableHeaderColumn tooltip="The status">Busy</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={this.state.showCheckboxes}
                            deselectOnClickaway={this.state.deselectOnClickaway}
                            showRowHover={this.state.showRowHover}
                            stripedRows={this.state.stripedRows}
                        >
                            {
                                Object.keys(this.props.parking.all).map((parkType) => (
                                    this.rowData(parkType)
                                ))}
                        </TableBody>
                    </Table>
                    <Dialog
                        title="Parking not has free places."
                        actions={actions}
                        modal
                        open={this.props.parking.notFree}
                    >
                        Parking not has free places.
                    </Dialog>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Park;
