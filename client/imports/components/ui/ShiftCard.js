import React, { Component, PropTypes } from 'react';
import moment from 'moment';
// import { ShiftService } from '../services/shift-service';
// import { NavigationService } from '../services/navigation-service';
import { EditShift } from '../EditShift';
// import { DeliveriesPage } from './deliveries-page.jsx';

import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close';

export default class ShiftCard extends Component {

  constructor() {
    super();
    this.edit = this.edit.bind(this);
    this.start = this.start.bind(this);
    this.resume = this.resume.bind(this);
  }

  edit() {
    console.log('WHY IS THIS RUNNING!');
    FlowRouter.go(`/shifts/${this.props.shift.id}`);
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

    let day = (`${moment(new Date(startTime)).format('D, MMMM, YYYY h:mm a')}`);
    if (endTime !== "undefined") day += ' to ' + endTime;

    let buttons = [<a className="waves-effect waves-light btn" key={ 1 } onClick={ this.edit } >Edit Shift</a>];

    if (!currentlyClockedIn && (moment(new Date(startTime)))  .isSame(moment(new Date()), 'day'))
      buttons.push(<a className="waves-effect waves-light btn" key={ 2 } onClick={ this.start } >Start Shift</a>);
    if (clockInTime !== "undefined" && clockOutTime == "undefined")
      buttons.push(<a className="waves-effect waves-light btn" key={ 3 } style={{ margin: '0 0 10px 0' }} onClick={ this.resume }>Resume Shift</a>);

    return (
        <div className='card grey lighten-4 row waves-effect waves-block default' style={{ margin: '10px 10px 10px 10px' }}>
          <div className='card-content'>
            <p className='activator flow-text'>{ day }<MoreVertIcon className='activator right' color={ "black" } /></p>
            <p>{ `Shift Title: ${ title }` }</p>
            <p>{ location ? `Shift location: ${ location }` : '' }</p>
          </div>
          <div className='card-reveal'>
            <span className='card-title' style={{ margin: '5px' }}><CloseIcon className='right card-title' color={ "black" } /></span>
            { buttons }
          </div>
        </div>
    );

  }

}

ShiftCard.propTypes = {
  shift: PropTypes.object.isRequired,
  currentlyClockedIn: PropTypes.bool
}