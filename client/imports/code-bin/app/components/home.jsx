import React from 'react';

import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import MenuItem from 'material-ui/lib/menus/menu-item';

import { ShiftService } from '../services/shift-service';
import { NavigationService } from '../services/navigation-service';

import { EditShift } from './edit-shift.jsx';
import { DeliveriesPage } from './deliveries-page.jsx';
import ShiftCard from './shift-card.jsx';

import _ from 'lodash';
import moment from 'moment';

const Home = React.createClass({

  getInitialState() { return { open: false }; },

  componentDidMount() {
    ShiftService.find((err, shifts) => {
      if (err) throw new Error(err);
      // -> Once we get results, set state with results.
      this.setState({ shifts }); // -> { shifts: shifts } shorthand.
    });
  },

  addShift() {
    NavigationService.pushState(<EditShift />);
  },

  render() {
    let shiftList;

    if (this.state.shifts) {

      let currentlyClockedIn = !!_.find(this.state.shifts, s => (s.clockInTime !== "undefined" && s.clockOutTime == "undefined"));

      shiftList = this.state.shifts.map((shift, i) => (
        <ShiftCard
          shift={ shift }
          currentlyClockedIn={ currentlyClockedIn }
          onClick={ this.selectShift }
          key={ shift.id } />
      ));

    }

    return (
      <div>

        <AppBar
          title="Shifts"
          iconElementRight={<FlatButton label="Add Shift" onClick={ this.addShift } />}
          onLeftIconButtonTouchTap={() => this.setState({ open: true })}
          style={{ backgroundColor: Colors.blueGrey900 }}>
        </AppBar>

        <LeftNav
          docked={false}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
          style={{ backgroundColor: Colors.grey200 }}>
          <AppBar style={{ backgroundColor: Colors.blueGrey900 }} showMenuIconButton={ false } title="Shifts Tip Tracker" />
          <MenuItem onTouchTap={this.handleClose}>Reports</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Settings</MenuItem>
          <Divider />
          <MenuItem onTouchTap={this.handleClose}>About Us</MenuItem>
        </LeftNav>

        <Paper style={{ maxHeight: '60vh', overflowY: 'auto', backgroundColor: Colors.grey100 }}>
          <h3 style={{ padding: '15px' }}>Upcoming Shifts</h3>
          { shiftList }
        </Paper>

      </div>
    );
  }
});

export { Home }