import React, { Component, PropTypes } from 'react';
import DatePicker from './ui/DatePicker';
import SelectOption from './ui/SelectOption';
import ReportService from '../services/ReportService';
import Numeral from 'numeral';
import { WEEK, MONTH, YEAR, ALL, CUSTOM } from '../enum/reportOptions';
import moment from 'moment';

export default class Reports extends Component {
  constructor() {
    super();
    this.state = {}
    this.selectChange = this.selectChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generate = this.generate.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderData = this.renderData.bind(this);
  }

  handleChange(e) {
    let state = this.state;
    if (e.target.name === 'startDate') {
      state.startDate = moment(new Date()).startOf('day');
    } else {
      state.endDate = moment(new Date()).endOf('day');
    }
    state[e.target.name].set(e.target.value);
    console.log('New state: ', state);
    this.setState({ ...state });
  }

  selectChange(e) {
    let state = this.state;
    state.selectOption = e.target.value;
    switch (e.target.value) {
      case '0':
        state.startDate = moment(new Date()).startOf('week');
        state.endDate = moment(new Date()).endOf('day');
        break;
      case '1':
        state.startDate = moment(new Date()).startOf('month');
        state.endDate = moment(new Date()).endOf('day');
        break;
      case '2':
        state.startDate = moment(new Date()).startOf('year');
        state.endDate = moment(new Date()).endOf('day');
        break;
      case '3':
        state.startDate = moment(new Date(null));
        state.endDate = moment(new Date()).endOf('day');
        break;
    }
    console.log(state);
    this.setState({ ...state });
  }

  generate() {
    let { startDate, endDate } = this.state;
    if (!startDate || !endDate) {
      Materialize.toast('Please select a date range.', 3500);
    } else {
      ReportService.generateReport(startDate, endDate, (err, data) => {
        console.log('Data returned: ', data);
        this.setState({ data });
      });
    }
  }

  renderOptions() {

    let options=[{
        value: WEEK, text: 'This Week'
      },{
        value: MONTH, text: 'This Month'
      },{
        value: YEAR, text: 'This Year'
      }, {
        value: ALL, text: 'All Time'
      }, {
        value: CUSTOM, text: 'Custom'
      }];

    let viewOptions = <div className="container">
        <br />
        <h4>Select Range</h4>

        <SelectOption
            options={ options }
            name="range"
            value={ 6 }
            option={ this.selectOption }
            onChange={ this.selectChange } />

        <div style={{ width: '100%' }}
             className="waves-effect waves-light btn blue-grey"
             onClick={ this.generate }>Generate!
        </div>
      </div>

    if (this.state.selectOption == 4) {
      viewOptions = <div className="container">
        <br />
        <h4>Select Range</h4>
        <SelectOption
            options={ options }
            name="range"
            value={ 6 }
            option={ this.selectOption }
            onChange={ this.selectChange } />


        <h4>Custom Date Range</h4>
        <DatePicker
          onChange={ this.handleChange }
          name="startDate"
          label="Start Date"
          value={ this.state.startDate } />

        <DatePicker
          onChange={ this.handleChange }
          name="endDate"
          label="End Date"
          value={ this.state.endDate } />

        <div style={{ width: '100%' }}
             className="waves-effect waves-light btn blue-grey"
             onClick={ this.generate }>Generate!</div>
      </div>
    }

    return (
      <div>
      { viewOptions }
      </div>
    );
  }

  renderData() {

    let data = this.state.data;

    let startRange = moment(new Date(this.state.startDate)).calendar();
    let endRange = moment(new Date(this.state.endDate)).calendar();

    return (
      <div className="container">
        <h3>Report</h3>
        <h5>{ startRange } - { endRange }</h5>


          <ul className='collection'>
            <li className='collection-item flow-text'>Number Of Shifts: { data.length }</li>
            <li className='collection-item flow-text'>Deliveries Taken: {_.sumBy(data, 'numberOfDeliveries')}</li>
            <li className='collection-item flow-text'>Hours Worked: {numeral(_.sumBy(data, 'hoursWorked')).format('0.00')}</li>
            <li className='collection-item flow-text'>Hourly Rate: {numeral(_.meanBy(data, 'calculatedHourly')).format('$0,0.00')}</li>
            <li className='collection-item flow-text'>Hourly Income Earned: {numeral(_.sumBy(data, 'hourlyIncomeEarned')).format('$0,0.00')}</li>
            <li className='collection-item flow-text'>Number Of Debit Fees: {_.sumBy(data, 'numberOfDebitFees')}</li>
            <li className='collection-item flow-text'>Debit Fee Deductions: {numeral(_.sumBy(data, 'debitFeeDeductions')).format('$0,0.00')}</li>
            <li className='collection-item flow-text'>Number Of Outs: { _.sumBy(data, 'numberOfOuts')}</li>
            <li className='collection-item flow-text'>Out Bonus Income: {numeral(_.sumBy(data, 'outBonusIncome')).format('$0,0.00')}</li>
            <li className='collection-item flow-text'>Delivery Bonus Income: {numeral(_.sumBy(data, 'deliveryBonusIncome')).format('$0,0.00')}</li>
            <li className='collection-item flow-text'><strong>Total Tips: {numeral(_.sumBy(data, 'totalTips')).format('$0,0.00')}</strong></li>
            <li className='collection-item flow-text'><strong>Total Income Earned: {numeral(_.sumBy(data, 'grandTotalIncome')).format('$0,0.00')}</strong></li>
          </ul>

        <button className="waves-effect waves-light btn" style={{ margin: '5px 0px 5px 0px', width: '100%'}} >Export</button>
      </div>
    );
  }

  render() {

    return this.state.data ? this.renderData() : this.renderOptions();
  }
}