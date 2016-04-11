import React, { Component } from 'react';

import moment from 'moment';
import _ from 'lodash';

import Shift from '../models/Shift';
import Setting from '../models/Setting';

import TimePicker from './ui/TimePicker';
import DatePicker from './ui/DatePicker';
import InputField from './ui/InputField';

export default class EditShift extends Component {

  constructor(props) {

    super(props);

    Setting.find((err, setting) => {
      if (err) {
        Materialize.toast(err, 3000);
        FlowRouter.go('/settings');
      } else {

        let { defaultTitle: title, defaultLocation: location } = setting;

        if (this.props.shiftId) {
          Shift.findOne(this.props.shiftId, (err, shift) => {
            if (err) {
              Materialize.toast('Error: ' + err, 3000);
              FlowRouter.go('/');
            } else {
              this.setState({ shift });
            }
          })
        } else {
          this.setState({
            shift: new Shift({ location, title })
          });
        }

      }
    });

    this.saveClicked = this.saveClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateTime = this.handleDateTime.bind(this);
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

  handleDateTime(e) {

    let { shift } = this.state;

    let { target: { value: v } } = e;

    if (_.isObject(v)) {

      shift.startTime = (moment(new Date()).set(v)).toDate();

      let startlabel = $(this.refs.startlabel);
      if (!startlabel.hasClass('active')) {
        startlabel.addClass('active'); // 8-) got style!!
      }

    } else if (_.isString(v)) {
      shift.setTime(v);
      let datelabel = $(this.refs.datelabel);
      if (!datelabel.hasClass('active')) {
        datelabel.addClass('active'); // 8-) got style!!
      }
    }

    this.setState({ shift });
  }

  render() {
    if (!this.state) return <p className="flow-text">Loading ...</p>;
    let shift = this.state.shift;
    return (
      <div className="container" style={{ paddingTop: '15px' }}>

        <InputField
          label="Title"
          name="title"
          onChange={ this.handleChange }
          value={ shift.title } />

        <InputField
          label="Location"
          name="location"
          onChange={ this.handleChange }
          value={ shift.location } />

        <DatePicker
          name="startTime"
          id="startTime"
          onChange={ this.handleDateTime }
          value={ shift.startTime }
          label={ 'Start Date' } />

        <TimePicker
          label="Start Time"
          name="startTime"
          value={ shift.startTime }
          onChange={ this.handleDateTime } />

        <TimePicker
          label="End Time"
          name="endTime"
          value={ shift.endTime }
          onChange={ this.handleChange } />

        <div style={{ width: '100%' }} className="waves-effect waves-light btn blue-grey" onClick={ this.saveClicked }>Save</div>
      </div>
    );
  }
}