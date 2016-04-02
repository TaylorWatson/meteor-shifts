import React, { Component } from 'react';

import moment from 'moment';
import _ from 'lodash';

import TimePicker from './ui/TimePicker';
import DatePicker from './ui/DatePicker';

export default class EditShift extends Component {

  constructor(props) {

    super(props);

    this.state = {
      shift: props.shift || {}
    }

    this.saveClicked = this.saveClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
  }

  componentDidMount() {
    
  }

  handleChange(event) {
    let { shift } = this.state;
    let { name, value } = event.target;

    shift[name] = value;

    this.setState({ shift });
  }

  saveClicked() {
    let { shift } = this.state;

    shift = new Shift(shift);

    var result = shift.validate(err => {
      console.log('Validated!');
      if (err) {
      } else {
        let _id = Shifts.insert(shift.raw());
        FlowRouter.go('/');
      }
    });
  }

  navBack() {
    window.history.back();
  }

  handleDateTimeChange(event) {
    console.log('date time changed!');
    console.log(_.clone(event));
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
      </div>
    );
  }
}