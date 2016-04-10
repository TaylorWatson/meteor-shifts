import React, { Component, PropTypes } from 'react';

// import { ShiftService } from '../services/shift-service';
import Title from '../reactive-vars/Title';

// import { EditShift } from './edit-shift.jsx';
// import { DeliveriesPage } from './deliveries-page.jsx';
import ShiftCard from './ui/ShiftCard';

//take out after shiftCards is finished.
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close';

import _ from 'lodash';
import moment from 'moment';

import Shift from '../models/Shift';

export default class Home extends Component {

  constructor() {
    super();

    this.state = {
      shifts: []
    }
  }

  componentDidMount() {
    $(this.refs.test).sideNav();
    Materialize.showStaggeredList('#shifts');

    Shift.find((err, shifts) => {
      this.setState({ shifts });
    })
  }


  addShift() {
    FlowRouter.go('/shifts');
  }

  render() {

    let shiftList;

    if (this.state.shifts.length) {

      let currentlyClockedIn = !!_.find(this.state.shifts, s => (s.clockInTime !== "undefined" && s.clockOutTime == "undefined"));

      shiftList = this.state.shifts.map((shift, i) => (
        <ShiftCard
          shift={ shift }
          currentlyClockedIn={ currentlyClockedIn }
          onClick={ this.selectShift }
          key={ shift.id } />
      )).reverse();

    } else {
      shiftList = <p style={{ paddingLeft: '20px' }} className="flow-text">No upcoming shifts.</p>
    }

    return (
      <ul className="collection" id='shifts'>
        { shiftList }
      </ul>
    );
  }
}

Home.propTypes = {
  shifts: PropTypes.array.isRequired
}
