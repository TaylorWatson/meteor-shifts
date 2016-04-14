import React, { Component, PropTypes } from 'react';

import Title from '../reactive-vars/Title';

import TimePicker from './ui/TimePicker';
import ShiftCard from './ui/ShiftCard';

//take out after shiftCards is finished.
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close';

import _ from 'lodash';
import moment from 'moment';

import Setting from '../models/Setting';
import Shift from '../models/Shift';

export default class Home extends Component {

  constructor() {
    super();
    this.delete = this.delete.bind(this);
    this.updateShiftsList = this.updateShiftsList.bind(this);
    this.actionClicked = this.actionClicked.bind(this);
    this.handleTimePickerSelection = this.handleTimePickerSelection.bind(this);
    this.state = {
      shifts: [],
      showTimePicker: false
    }

    Setting.find((err, setting) => {
      if (err) {
        FlowRouter.go('/help');
      }
    });
  }

  updateShiftsList() {
    Shift.findUpcoming((err, shifts) => {
      shifts.sort((a, b) => {
        let start = moment(new Date(a.startTime));
        let end = moment(new Date(b.startTime));
        if (start.isBefore(end)) return -1;
        else return 1;
      });
      this.setState({ shifts });
    });
  }

  componentDidMount() {
    $(this.refs.test).sideNav();
    Materialize.showStaggeredList('#shifts');
    this.updateShiftsList();
    this.updateInterval = setInterval(this.updateShiftsList, 60000);
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  }


  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  delete(id) {
    Shift.delete(id, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log('shift deleted');
        this.updateShiftsList();
      }
    });
  }

  addShift() {
    FlowRouter.go('/shifts');
  }

  actionClicked(isClockedIn) {
    return () => {
      if (isClockedIn) {
        let shiftId = _.find(this.state.shifts, s => (!!s.clockInTime && !s.clockOutTime)).id;
        FlowRouter.go(`/deliveries/${shiftId}`);
      } else {
        this.setState({ showTimePicker: true });
      }
    }
  }

  handleTimePickerSelection(e) {
    this.setState({ showTimePicker: false });
    let { value: time } = e.target;

    console.log('Picked time: ', time);

    Setting.find((err, setting) => {
      if (err) {
        FlowRouter.go('/settings');
      } else {
        let { defaultTitle: title = "Anonymous", defaultLocation: location } = setting;
        if (!title) { title = "Anonymous" };
        let shift = new Shift({ title, location });
        shift.setTime(time);
        shift.setClockInTime(time);
        shift.setSettings(setting);
        shift.save((err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('Results: ', result);
          FlowRouter.go(`/deliveries/${result.insertId}`);
        });
      }
    });
  }

  render() {

    let shiftList, currentlyClockedIn = false;

    if (this.state.shifts.length) {

      currentlyClockedIn = !!_.find(this.state.shifts, s => (!!s.clockInTime && !s.clockOutTime));

      shiftList = this.state.shifts.map((shift, i) => (
        <ShiftCard
          shift={ shift }
          currentlyClockedIn={ currentlyClockedIn }
          delete={ this.delete }
          onClick={ this.selectShift }
          key={ shift.id } />
      ));

    } else {
      shiftList = <p style={{ paddingLeft: '20px' }} className="flow-text">No upcoming shifts.</p>
    }

    return (
      <div>
        <div className="container">
          <div onClick={ this.actionClicked(currentlyClockedIn) } className="waves-effect waves-light btn" style={{ width: '100%', margin: '10px 0 0 0' }}>
            { currentlyClockedIn ? 'Resume Shift' : 'Clock In Now' }
          </div>
        </div>
        <ul className="collapsible popout" data-collapsible="accordion" id='shifts'>
          { shiftList }
        </ul>
        {
          this.state.showTimePicker ? 
          <TimePicker focusOnMount name="anonymous" onChange={ this.handleTimePickerSelection } />
          : <div /> }
      </div>
    );
  }
}

Home.propTypes = {
  shifts: PropTypes.array.isRequired
}
