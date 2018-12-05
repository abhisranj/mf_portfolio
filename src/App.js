import React, { Component } from 'react';
import { InvestmentInputs, InvestmentDetails } from './Components';
import mf_data from './mf_data/mf_data.json';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      fundNames: [...Object.assign([...new Set(mf_data.map(item => item["Scheme Name"]))].map(d => ({value: d, label: d})))],
    };
  }

  findInArray = (fundName, date, type) => {
    let date_check = date;
    let mf_details_on_date = [];
    mf_details_on_date = mf_data.filter(function (mf) {
      return mf["Scheme Name"] === fundName &&
             mf["Date"] === date_check;
    });
    if (mf_details_on_date.length === 0) {
      let date_offset = type === "today" ? -1 : 1;
      let date_check1 = new Date(date_check);
      date_check1 = date_check1.add(date_offset).day().toString('dd-MMM-yyyy');
      return this.findInArray(fundName, date_check1, type);
    } else {
      return mf_details_on_date;
    }
  }

  calculateCurrentValue = (payload) => {
    let NAV_bought_date = this.findInArray(payload.fundName, payload.investmentDate, "bought");
    let NAV_today = this.findInArray(payload.fundName, (new Date()).day().toString('dd-MMM-yyyy'), "today");
    const units = payload.amountInvested / parseFloat(NAV_bought_date[0]["Net Asset Value"]);
    const current_val = units * parseFloat(NAV_today[0]["Net Asset Value"]);
    payload.units = units;
    payload.current_val = current_val;
    return payload;
  }

  render() {
    return (
      <div class="container">
        <InvestmentInputs
          fundNames={this.state.fundNames}
          calculateCurrentValue={this.calculateCurrentValue}
        />
        <InvestmentDetails />
      </div>
    );
  }
}


export default App;
