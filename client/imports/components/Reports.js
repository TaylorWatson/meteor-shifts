import React, { Component, PropTypes } from 'react';
import DatePicker from './ui/DatePicker';
import SelectOption from './ui/SelectOption';
import ReportService from '../services/ReportService';
import Numeral from 'numeral';
import { WEEK, MONTH, YEAR, ALL, CUSTOM } from '../enum/reportOptions';
import moment from 'moment';
import ShiftItem from './ui/ShiftItem';
import numbro from 'numbro';

export default class Reports extends Component {
  constructor() {
    super();
    this.state = {}
    this.handleExport = this.handleExport.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generate = this.generate.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderData = this.renderData.bind(this);
  }

  componentDidMount() {
    this.state.startDate = moment(new Date()).startOf('week');
    this.state.endDate = moment(new Date()).endOf('day');
    $(this.refs.shiftModal).leanModal({
      dismissible: true
    });
    console.log(navigator);
  }

  componentWillUnmount() {
    $(this.refs.shiftModal).closeModal();
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

  handleCheckbox(e) {
    this.state.checked = e.target.checked;
    e.target.checked ? $(this.refs.metrics).material_select('destroy') : $(this.refs.metrics).material_select();
    console.log(this.state.checked);
  }

  handleExport() {
    var storage = window.localStorage;
    var value = storage.getItem(key);
    storage.setItem(key, value);
    storage.removeItem(key);
  }

  handleModal() {
    $(this.refs.shiftModal).openModal();
  }

  handleOnClick(shift) {
    FlowRouter.go('/deliveries/:shiftId/summary', { shiftId: shift.id } );
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
      case '4':
        this.handleChange;
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
            onClick={ this.selectChange } />

        <p>
          <input type="checkbox" className="filled-in" id="filled-in-box" defaultChecked='checked' onClick={ this.handleCheckbox } />
          <label htmlFor="filled-in-box">All metrics</label>
        </p>

        <select ref='metrics' multiple>
          <option defaultSelected='selected' value="" disabled defaultSelected>Choose your options</option>
          <option defaultChecked='checked' value="1">Number of shifts</option>
          <option defaultChecked='checked' value="2">Deliveries taken</option>
          <option defaultChecked='checked' value="3">Hourly rate</option>
          <option defaultChecked='checked' value="4">Hourly income earned</option>
          <option defaultChecked='checked' value="5">Number of debit fees</option>
          <option defaultChecked='checked' value="6">Debit fee deductions</option>
          <option defaultChecked='checked' value="7">Number of outs</option>
          <option defaultChecked='checked' value="8">Out bonus income</option>
          <option defaultChecked='checked' value="9">Delivery bonus income</option>
          <option defaultChecked='checked' value="10">Total tips</option>
          <option defaultChecked='checked' value="11">Total income earned</option>
        </select>

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
    let shifts = _.map(data, 'shift');
    let startRange = moment(new Date(this.state.startDate)).calendar();
    let endRange = moment(new Date(this.state.endDate)).calendar();

    let shiftList = <p className='flow-text'>No Shifts In Report Time Frame</p>
    console.log(shifts.length);
    if (shifts.length) {
      shiftList = shifts.map((shift, i) => (
              <ShiftItem
                day={ shift.day }
                title={ shift.title }
                location={ shift.location }
                startTime={ shift.startTime }
                endTime={ shift.clockOutTime }
                key={ shift.id }
                id={ shift.id }
                shift={ this.handleOnClick }
                />
            ));
    }

    return (
      <div className="container">
        <h3>Report</h3>
        <h5>{ startRange } - { endRange }</h5>
          <ul className='collection'>
            <li className='collection-item flow-text'>Number Of Shifts: { shifts.length }</li>
            <li className='collection-item flow-text'>Deliveries Taken: { _.sumBy(data, 'numberOfDeliveries') }</li>
            <li className='collection-item flow-text'>Hours Worked: { numbro(_.sumBy(data, 'hoursWorked')).format('0,0') }</li>
            <li className='collection-item flow-text'>Hourly Rate: { numbro(_.sumBy(data, 'calculatedHourly')).formatCurrency() }</li>
            <li className='collection-item flow-text'>Hourly Income Earned: { numbro(_.sumBy(data, 'hourlyIncomeEarned')).formatCurrency() }</li>
            <li className='collection-item flow-text'>Number Of Debit Fees: { _.sumBy(data, 'numberOfDebitFees')}</li>
            <li className='collection-item flow-text'>Debit Fee Deductions: { numbro(_.sumBy(data, 'debitFeeDeductions')).formatCurrency() }</li>
            <li className='collection-item flow-text'>Number Of Outs: { _.sumBy(data, 'numberOfOuts') }</li>
            <li className='collection-item flow-text'>Out Bonus Income: { numbro(_.sumBy(data, 'outBonusIncome')).formatCurrency() }</li>
            <li className='collection-item flow-text'>Delivery Bonus Income: { numbro(_.sumBy(data, 'deliveryBonusIncome')).formatCurrency() }</li>
            <li className='collection-item flow-text'><strong>Total Tips: { numbro(_.sumBy(data, 'totalTips')).formatCurrency() }</strong></li>
            <li className='collection-item flow-text'><strong>Total Income Earned: { numbro(_.sumBy(data, 'grandTotalIncome')).formatCurrency() }</strong></li>
          </ul>
        <button className="waves-effect waves-light btn" style={{ margin: '5px 0px 5px 0px', width: '100%'}} onClick={ this.handleModal } >View Shifts</button>
        <button className="waves-effect waves-light btn" style={{ margin: '5px 0px 5px 0px', width: '100%'}} onClick={ this.handleExport } >Export</button>

        <div id="modal1"  ref='shiftModal' className="modal bottom-sheet">
          <div className="modal-content">
            <h4>Shifts in reported time</h4>
            <ul>
              { shiftList }
            </ul>
          </div>

        </div>

      </div>
    );
  }

  render() {

    return this.state.data ? this.renderData() : this.renderOptions();
  }
}