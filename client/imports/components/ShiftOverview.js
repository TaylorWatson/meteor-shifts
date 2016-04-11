import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

import InputField from './ui/InputField';
import Shift from '../models/Shift';
import Delivery from '../models/Delivery';

export default class ShiftOverview extends Component {
  constructor() {
    super();
    this.state = {
      deliveries: [],
      stats: {},
      shift: {}
    }
    this.clockOut = this.clockOut.bind(this);
    this.startInterval = this.startInterval.bind(this);
  }

  componentDidMount() {
    Shift.findOne(this.props.shiftId, (err, shift) => {
      shift.getTotalsPromise().then(stats => {
        this.setState({ stats });
      });

      if (shift.clockOutTime == 'undefined') {
        this.startInterval();
      }

      this.setState({ shift });
    });
    Delivery.deliveryList(this.props.shiftId, (err, deliveries) => {
      this.setState({ deliveries });
    });
  }

  startInterval() {
    this.interval = setInterval(() => {
      this.state.shift.getTotalsPromise().then(stats => {
        this.setState({ stats });
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  clockOut() {
    Shift.clockOutTime(this.props.shiftId, (err, result) => {
      if (!result.rowsAffected) {
        Materialize.toast('There was an error clocking you out.', 3000);
      } else {
        FlowRouter.go('/');
      }
    });
  }

  back() {
    window.history.back();
  }

  render() {

    let { stats, shift, deliveries } = this.state;

    let Buttons = [
      <br key={0} />,
      <div key={1} />,
      <div key={2} className="waves-effect waves-light btn" style={{ margin: '5px 0px 5px 0px', width: '100%'}} onClick={ this.back }>Return</div>
    ];
    if (!shift.clockOutTime || shift.clockOutTime == "undefined") {
      Buttons[1] = <div key={3} className="waves-effect waves-light btn" style={{ margin: '5px 0px 5px 0px', width: '100%'}} onClick={ this.clockOut }>Clock Out</div>;
    }

    let BiggestTip = _.maxBy(deliveries, 'tipAmount');

    return (
      <div className="container"><br/>
        <ul className="collection">
          <li className="collection-item">Deliveries Taken: { stats.numberOfDeliveries }</li>
          <li className="collection-item">Hours Worked: { numeral(stats.hoursWorked).format('0.00') }</li>
          <li className="collection-item">Hourly Rate: { numeral(shift.hourlyRate).format('0.00') }</li>
          <li className="collection-item">Hourly Income Earned: ${ numeral(stats.hourlyIncomeEarned).format('0.00') }</li>
          <li className="collection-item">Debit Fee Deductions: ${ numeral(stats.debitFeeDeductions).format('0.00') }</li>
          <li className="collection-item">Total Tips: ${ numeral(stats.totalTips).format('0.00') }</li>
          <li className="collection-item">Total Income Earned: ${ numeral(stats.grandTotalIncome).format('0.00') }</li>
          <li className="collection-item">Biggest Tip: ${ BiggestTip ? numeral(BiggestTip.tipAmount).format('0.00') : "0.00" }</li>
          <li className="collection-item">Number of Stiffs: { stats.numberOfStiffs }</li>
          <li className="collection-item">Calculated Hourly: ${ numeral(stats.calculatedHourly).format('0.00') }</li>
        </ul>
        <p className="flow-text">Delivery Numbers: { _.map(deliveries, 'deliveryNumber').join(', ') }</p>
        <p className="flow-text">Take Home: ~${ numeral(stats.grandTotalIncome).format('0.00') }</p>
        { Buttons }
      </div>
    )
  }
}