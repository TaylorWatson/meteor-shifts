import React, { Component, PropTypes } from 'react';
import DatePicker from './ui/DatePicker';
import ReportService from '../services/ReportService';

import moment from 'moment';

export default class Reports extends Component {
  constructor() {
    super();
    this.state = {}

    this.handleChange = this.handleChange.bind(this);
    this.generate = this.generate.bind(this);
    this.renderPicker = this.renderPicker.bind(this);
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

  renderPicker() {
    return (
      <div className="container">
        <br/>
        <h3>Select Date Range</h3>

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
    );
  }

  renderData() {
    let totalIncome = _.sumBy(this.state.data, d => (
      d.incomeEarned + d.deliveryIncome
    ));

    return (
      <div className="container">
        <br/>
        <h3>Report:</h3>

        <table className="bordered">
          <thead>
            <tr>
              <th>Deliveries</th>
              <th>Total Income</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ _.sumBy(this.state.data, 'numberOfDeliveries') }</td>
              <td>${ totalIncome.toFixed(2) }</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return this.state.data ? this.renderData() : this.renderPicker();
  }
}