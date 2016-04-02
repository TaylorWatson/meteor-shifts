import React, { Component } from 'react';

import moment from 'moment';
import _ from 'lodash';

import Shift from '../models/Shift';

import TimePicker from './ui/TimePicker';
import DatePicker from './ui/DatePicker';

export default class EditShift extends Component {

  constructor(props) {

    super(props);

    this.state = {
      shift: new Shift(props.shift || {})
    }

    this.saveClicked = this.saveClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
  }

  handleChange(event) {
    let { shift } = this.state;
    let { name, value } = event.target;

    shift[name] = value;

    console.log(shift);
    this.setState({ shift });
  }

  saveClicked() {
    let { shift } = this.state;

    shift.save(err => {
      if (err) {
        Materialize.toast(err, 3000, 'red');
      } else {
        FlowRouter.go('/');
      }
    })
  }

  navBack() {
    window.history.back();
  }

  handleDateTimeChange(e) {
    let { shift } = this.state;
    if (e.target.value.date) {
      let { startTime, endTime } = shift;

      if (startTime) {
        startTime.set(e.target.value);
        startTime = moment(new Date(startTime));
      } else {
        startTime = moment(new Date());
        startTime.set(e.target.value);
      }

      shift.startTime = startTime.toDate();

      if (endTime) {
        endTime = moment(new Date(endTime));
        endTime.set(e.target.value);
        shift.endTime = endTime.toDate();
      }
    } else {
      let obj = shift[e.target.name];
      let newDate = new Date(obj ? obj : new Date());
      let time = moment(newDate);
      let adjustedTime = time.set(e.target.value);
      let value = adjustedTime.toDate();
      shift[e.target.name] = value;
    }

    let { eTime, sTime } = this.fixBeforeAfter(shift);
    if (shift.startTime) {
      shift.startTime = sTime;
    }
    if (shift.endTime) {
      shift.endTime = eTime;
    }

    console.log(shift);

    this.setState({ shift });
  }

  fixBeforeAfter(shift) {
    let { startTime, endTime } = shift;
    startTime = moment(new Date(startTime));
    endTime = moment(new Date(endTime));

    if (endTime.isBefore(startTime)) {
      endTime.add({ days: 1 });
    }

    return {
      sTime: startTime.toDate(),
      eTime: endTime.toDate()
    }
  }

  render() {
    let shift = this.state.shift;
    return (
      <div className="container" style={{ paddingTop: '15px' }}>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" onChange={ this.handleChange } type="text"/>
        </div>
        <div className="input-field">
          <label htmlFor="location">Location</label>
          <input id="location" name="location" onChange={ this.handleChange } type="text"/>
        </div>
        <div className="input-field">
          <label htmlFor="startDate">Start Date</label>
          <DatePicker name="startTime" id="startDate" onChange={ this.handleDateTimeChange } value={ shift.startTime } />
        </div>
        <div className="input-field">
          <label htmlFor="startTime">Start Time</label>
          <TimePicker name="startTime" value={ shift.startTime } onChange={ this.handleDateTimeChange } />
        </div>
        <div className="input-field">
          <label htmlFor="endTime">End Time</label>
          <TimePicker name="endTime" value={ shift.endTime } onChange={ this.handleDateTimeChange } />
        </div>

        <div style={{ width: '100%' }} className="waves-effect waves-light btn blue-grey" onClick={ this.saveClicked }>Save</div>
      </div>
    );
  }
}