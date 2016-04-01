import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import moment from 'moment';
// import { ShiftService } from '../services/shift-service';
// import { NavigationService } from '../services/navigation-service';
import { EditShift } from '../EditShift';
// import { DeliveriesPage } from './deliveries-page.jsx';

export default class ShiftCard extends Component {

  edit() {
    FlowRouter.go(`/shifts/${this.props.shift._id}`);
  }

  start() {

    ShiftService.clockInTime(id, () => {
      NavigationService.pushState(<DeliveriesPage shiftId={ this.props.shift.id } />);
    });

  }

  resume() {

    console.log(this.props.shift);

    NavigationService.pushState(<DeliveriesPage shiftId={ this.props.shift.id } />);

  }

  render() {

    let { shift, currentlyClockedIn } = this.props;

    let { startTime, clockOutTime, clockInTime, endTime, title, location } = shift;

    startTime = moment(startTime);

    let day = `${moment(new Date(startTime)).format('dddd [the] Do [at] h:mm a')} to ${moment(new Date(endTime)).format('h:mm a')}`;

    let buttons = [<FlatButton label="Edit Shift" key={1} onClick={ this.edit } />];

    if (!currentlyClockedIn && (moment(new Date(startTime))).isSame(moment(new Date()), 'day'))
      buttons.push(<FlatButton label="Start Shift" key={2} onClick={ this.start } />);
    if (clockInTime !== "undefined" && clockOutTime == "undefined")
      buttons.push(<FlatButton label="Resume Shift" key={3} onClick={ this.resume } />);

    return (
      <Card style={{ margin: '10px' }}>
        <CardHeader
          title={ day }
          subtitle={ `${title} ${location ? ' - ' + location : ''}` }
        />
        <CardActions expandable={false}>
          { buttons }
        </CardActions>
      </Card>
    );

  }

}

ShiftCard.propTypes = {
  shift: PropTypes.object.isRequired,
  currentlyClockedIn: PropTypes.bool
}