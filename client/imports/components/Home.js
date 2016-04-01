import React, { PropTypes } from 'react';

import { Colors } from 'material-ui/lib/styles';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';

// import { ShiftService } from '../services/shift-service';
import LeftNavOpen from '../reactive-vars/LeftNavOpen';

// import { EditShift } from './edit-shift.jsx';
// import { DeliveriesPage } from './deliveries-page.jsx';
import ShiftCard from './ui/ShiftCard';

import _ from 'lodash';
import moment from 'moment';

export default class Home extends React.Component {

  addShift() {
    FlowRouter.go('/shifts');
  }

  openSideNav() {
    LeftNavOpen.set(true);
  }

  render() {
    let shiftList;

    if (this.props.shifts.length) {

      let currentlyClockedIn = !!_.find(this.props.shifts, s => (s.clockInTime !== "undefined" && s.clockOutTime == "undefined"));

      shiftList = this.props.shifts.map((shift, i) => (
        <ShiftCard
          shift={ shift }
          currentlyClockedIn={ currentlyClockedIn }
          onClick={ this.selectShift }
          key={ shift._id } />
      ));

    }

    return (
      <div>

        <AppBar
          title="Shifts"
          iconElementRight={<FlatButton label="Add Shift" onClick={ this.addShift } />}
          onLeftIconButtonTouchTap={ this.openSideNav }
          style={{ backgroundColor: Colors.blueGrey900 }}>
        </AppBar>

        <Paper style={{ maxHeight: '60vh', overflowY: 'auto', backgroundColor: Colors.grey100 }}>
          <h3 style={{ padding: '15px' }}>Upcoming Shifts</h3>
          { shiftList }
        </Paper>

      </div>
    );
  }
}

Home.propTypes = {
  shifts: PropTypes.array.isRequired
}