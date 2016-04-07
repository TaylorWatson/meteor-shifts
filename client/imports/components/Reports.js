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
    state[e.target.name] = moment()[e.target.name == 'startDate' ? 'startOf' : 'endOf']('day');
    state[e.target.name].set(e.target.value);
    this.setState({ ...state });
  }

  generate() {
    let { startDate, endDate } = this.state;
    if (!startDate || !endDate) {
      Materialize.toast('Please select a date range.', 3500);
    } else {
      ReportService.generateReport(startDate, endDate, (err, data) => {
        console.log('data found!');
        console.log(data);
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

  renderData() {}

  render() {
    return this.state.data ? this.renderData() : this.renderPicker();
  }
}