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
    this.delete = this.delete.bind(this);
    this.resume = this.resume.bind(this);
  }

  edit() {
    console.log('WHY IS THIS RUNNING!');
    FlowRouter.go(`/shifts/${this.props.shift.id}`);
  }

  start() {

    Shift.clockInTime(this.props.shift.id, (err) => {
      if (err) {
        console.error(err);
        Materialize.toast(err, 3000);
      } else {
        console.log('shiftID: ' + this.props.shift.id);
        FlowRouter.go(`/deliveries/${this.props.shift.id}`);
      }
    });
  }

  delete() {
    this.props.delete(this.props.shift.id);
  }

  resume() {
    console.log('shiftID: ' + this.props.shift.id);
    FlowRouter.go(`/deliveries/${this.props.shift.id}`);

  }

  render() {

    let { shift, currentlyClockedIn } = this.props;

    let { startTime, clockOutTime, clockInTime, endTime, title, location } = shift;

    startTime = moment(new Date(startTime));

    let day = moment(new Date(startTime)).format('MMMM D, h:mm a');
    if (endTime !== "undefined") day += ' to ' + endTime;

    let buttons = [<a className="waves-effect waves-light btn" key={ 1 } style={{ width: '100%', margin: '0 0px 10px 0' }} onClick={ this.edit } >Edit Shift</a>];

    if (!currentlyClockedIn && (clockInTime == "undefined" && clockOutTime == "undefined") && (moment(new Date(startTime))).isSame(moment(new Date()), 'day'))
      buttons.push(<a className="waves-effect waves-light btn" key={ 2 } style={{ width: '100%', margin: '0px 0px 10px 0px' }} onClick={ this.start } >Start Shift</a>);
    if (clockOutTime !== "undefined" && clockInTime !== "undefined")
      buttons.push(<a className="waves-effect waves-light btn" key={ 2 } style={{ width: '100%', margin: '0px 0px 10px 0px' }} onClick={ this.review } >Review Shift</a>);
    if (clockInTime !== "undefined" && clockOutTime == "undefined")
      buttons.push(<a className="waves-effect waves-light btn" key={ 3 } style={{ width: '100%', margin: '0 0 10px 0' }} onClick={ this.resume }>Resume Shift</a>);
      buttons.push(<a className="waves-effect waves-light btn" key={ 4 } style={{ width: '100%', margin: '0 0 10px 0' }} onClick={ this.delete }>Delete Shift</a>);

    let hasLocation = location;
    if (!location) {
      hasLocation = '';
    }
    return (
      <li className='grey lighten-4' style={{ margin: '10px' }}>
        <div className="collapsible-header grey lighten-4" style={{ padding: '5px 5px 5px 5px'}}>
          <h5 className='flow-text'><strong>{ day }</strong><MoreVertIcon className='activator right' color={ "black" } /></h5>
          <h5 className='flow-text'><strong>{ title }</strong></h5>
          <h5 className='flow-text'>{ hasLocation }</h5>
        </div>
        <div className="collapsible-body grey lighten-4" style={{padding: '10px 10px 0px 10px'}}>
              { buttons }
        </div>
      </li>

    );

  }

}

ShiftCard.propTypes = {
  shift: PropTypes.object.isRequired,
  currentlyClockedIn: PropTypes.bool
}



{/*<div className='card grey lighten-4 row waves-effect waves-block default' style={{ margin: '10px 10px 10px 10px' }}>
          <div className='card-content'>
            <p className='activator flow-text'>{ day }<MoreVertIcon className='activator right' color={ "black" } /></p>
            <p>{ `Shift Title: ${ title }` }</p>
            <p>{ location ? `Shift location: ${ location }` : '' }</p>
          </div>
          <div className='card-reveal'>
            <span className='card-title' style={{ }}><CloseIcon className='right card-title' color={ "black" } /></span>
            { buttons }
          </div>
        </div>*/}
