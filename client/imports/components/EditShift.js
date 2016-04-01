import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import Paper from 'material-ui/lib/paper';
import { Colors } from 'material-ui/lib/styles';
import TimePicker from 'material-ui/lib/time-picker/time-picker';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import IconButton from 'material-ui/lib/icon-button';
import KeyboardArrowLeft from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-left';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';

// import { NavigationService } from '../services/navigation-service';
// import { ShiftService } from '../services/shift-service';
import FloatingHeader from './ui/FloatingHeader';
import { Shift, Shifts } from '../../../lib/imports/collections/Shifts';

import moment from 'moment';

const Style = {
  width: '100%',
  padding: '10px',
  backgroundColor: Colors.blueGrey50,
  height: 'calc(100vh - 64px)',
  display: 'inline-block',
  overflowX: 'auto'
};

const SaveButton = {
  width: '100%',
  height: '50px',
  backgroundColor: Colors.blueGrey900,
};

const SubStyle = {
  backgroundColor: Colors.grey100,
  padding: '15px'
};

export default class EditShift extends Component {

  constructor(props) {

    super(props);

    this.state = {
      shift: new Shift(props.shift || {})
    }

    this.saveClicked = this.saveClicked.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);

  }

  changeHandler(event) {
    let { shift } = this.state;
    let { name, value } = event.target;

    shift[name] = value;

    this.setState({ shift });
  }

  saveClicked() {
    let { shift } = this.state;

    var result = shift.validate(err => {
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
      <div>
        <AppBar
          title="Add Shift"
          iconElementLeft={<IconButton onClick={ this.navBack }><KeyboardArrowLeft /></IconButton>}
          style={{ backgroundColor: Colors.blueGrey900 }} />

        <Paper style={ Style } zDepth={2}>
          <FloatingHeader backgroundColor={ Colors.blueGrey900 } color={ Colors.grey50 }>Shift Info</FloatingHeader>

          <Paper style={ SubStyle } zDepth={1}><br />
            <TextField name="title" hintText="Title" value={ shift.title } fullWidth onChange={ this.changeHandler } /><br />
            <TextField name="location" hintText="Location" value={ shift.location } fullWidth onChange={ this.changeHandler } />
          </Paper>

          <FloatingHeader backgroundColor={ Colors.blueGrey900 } color={ Colors.grey50 }>Shift Time</FloatingHeader>

          <Paper style={ SubStyle } zDepth={1}><br />
            <DatePicker
              hintText="Start Date"
              defaultDate={ this.state.editing ? new Date(shift.startTime) : new Date() }
              value={ shift.startTime }
              onChange={ this.handleDateTimeChange('startTime:date') } />
            <TimePicker
              ref="startTime"
              format="ampm"
              hintText="Start Time"
              value={ shift.startTime }
              onChange={ this.handleDateTimeChange('startTime:time') } />
            <TimePicker
              ref="endTime"
              format="ampm"
              hintText="End Time"
              value={ shift.endTime }
              onChange={ this.handleDateTimeChange('endTime:time') } />
          </Paper>
          <RaisedButton label="Save" onMouseUp={ this.saveClicked } style={ SaveButton } />
        </Paper>


      </div>
    );
  }
}
