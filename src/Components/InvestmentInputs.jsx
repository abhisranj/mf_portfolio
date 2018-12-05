import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import { connect } from 'react-redux';
import { saveInvestmentAction } from '../actions/saveInvestmentAction';

import "react-datepicker/dist/react-datepicker.css";
import './InvestmentInputs.css';

class InvestmentInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investmentDate: new Date('04/01/2015'),
      fundName: null,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFundName = (fundName, val) => {
    this.setState({ fundName: fundName.label });
  }

  handleChangeDate = (date) => {
    this.setState({
      investmentDate: date,
      fundName: null,
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    const payload = {
      fundName: this.state.fundName,
      investmentDate: (new Date(this.state.investmentDate)).add(0).day().toString('dd-MMM-yyyy'),
      amountInvested: this.state.amountInvested
    };
    const modified_payload = this.props.calculateCurrentValue(payload);
    this.props.saveInvestmentAction(modified_payload);
  }

  render() {
    const { fundNames } = this.props;
    const submitDisabled = !this.state.fundName || this.state.amountInvested <= 0 || !this.state.amountInvested;
    return(
      <div class="container" id="form-input">
        <h3 class="text-center">Please input your Investments</h3><br />
        <form class="border border-light p-5">
          <label>Fund Name</label>
          <Select
            options={fundNames}
            onChange={this.handleFundName}
          /><br />

          <label>Date of Investment (between 01-Apr-2015 & today)</label><br />
          <DatePicker
            selected={this.state.investmentDate}
            onChange={this.handleChangeDate}
          /><br /><br />
          
          <label>Investment Amount</label>
          <input
            type="number"
            id="amountInvested"
            class="form-control mb-4"
            placeholder="Amount Invested"
            onChange={this.handleChange}
          /><br />
          
          <button
            class="btn btn-info btn-block"
            type="submit"
            onClick={this.handleClick}
            disabled={submitDisabled}
          >Save</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
 ...state
});

const mapDispatchToProps = dispatch => ({
 saveInvestmentAction: (investmentDate) => dispatch(saveInvestmentAction(investmentDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentInputs);
