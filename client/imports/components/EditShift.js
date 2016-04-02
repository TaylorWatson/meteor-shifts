import React, { Component } from 'react';
import '../assets/time-picker/materialize.clockpicker';

import moment from 'moment';

export default class EditShift extends Component {

  constructor(props) {

    super(props);

    this.state = {
      shift: props.shift || {}
    }

    this.saveClicked = this.saveClicked.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
  }

  componentDidMount() {
    $(this.refs.startDate).pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectHours: true,
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $(this.refs.startTime).pickatime({
      twelvehour: true,
      donetext: 'Done',
      afterDone: this.startTimeDone
    });

    $(this.refs.endTime).pickatime({
      twelvehour: true,
      donetext: 'Done',
      afterDone: this.endTimeDone
    });
  }

  changeHandler(event) {
    let { shift } = this.state;
    let { name, value } = event.target;

    shift[name] = value;

    this.setState({ shift });
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

  handleDateTimeChange(procedure) {
    let [ field, action ] = procedure.split(':');

    return (err, newDate) => {
      let { shift } = this.state;

      shift[field] = (moment(new Date(newDate)).set(
        action == 'date' ?
        {
          year: newDate.getFullYear(),
          month: newDate.getMonth(),
          date: newDate.getDate()
        } :
        {
          hour: newDate.getHours(),
          minute: newDate.getMinutes(),
          second: newDate.getSeconds(),
          millisecond: newDate.getMilliseconds()
        }
      )).toDate();

      let { eTime, sTime } = this.fixBeforeAfter(shift);
      shift.startTime = sTime;
      if (shift.endTime) shift.endTime = eTime;
      this.setState({ shift });
    }
  }

  startTimeDone() {

  }

  endTimeDone() {

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
        <label>Title</label>
        <input id="title" name="title" onChange={ this.handleChange } type="text"/>
        <label>Location</label>
        <input id="location" name="location" onChange={ this.handleChange } type="text"/>
        <label>Start Date</label>
        <input type="date" id='startDate' ref='startDate' className="datepicker" />
        <label>Start Time</label>
        <input id="startTime" ref='startTime' className="timepicker" type="text" />
        <label>End Time</label>
        <input id="endTime" ref='endTime' className="timepicker" type="text" />
      </div>
    );
  }
}