import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import { connect } from 'react-redux';
import './InvestmentInputs.css';

class InvestmentDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { details } = this.props;
    let grouped = [];
    details.forEach(function (o) {
      if (!this[o.fundName]) {
          this[o.fundName] = { fundName: o.fundName, amountInvested: 0, units: 0, current_val:0 };
          grouped.push(this[o.fundName]);
      }
      this[o.fundName].amountInvested += parseFloat(o.amountInvested);
      this[o.fundName].units += parseFloat(o.units);
      this[o.fundName].current_val += parseFloat(o.current_val);
    }, Object.create(null));

    // word wrap does not work on numerical columns
    // Open In-Progress issue on github for react-bootstrap-table
    //https://github.com/AllenFang/react-bootstrap-table/issues/1009
    return (
      <div class="container text-center" id="form-details">
        <h3>Current Status (as of latest data available)</h3><br />
        <BootstrapTable data={ grouped } options={ { noDataText: 'No data available on Investments. Please input your investments above.' } }>
            <TableHeaderColumn dataField='fundName' isKey={ true } width={'40%'} tdStyle={ { whiteSpace: 'normal' } } thStyle={{ whiteSpace: 'normal' }}>Fund Name</TableHeaderColumn>
            <TableHeaderColumn dataField='amountInvested' tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' } }>Total Investments</TableHeaderColumn>
            <TableHeaderColumn dataField='units' tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' } } >Total Units</TableHeaderColumn>
            <TableHeaderColumn dataField='current_val' tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' } } >Current Value</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  details: state && state.saveInvestmentReducer && state.saveInvestmentReducer.result
});

export default connect(mapStateToProps)(InvestmentDetails);
