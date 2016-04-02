import React, { Component, PropTypes } from 'react';
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

    // let { shift, currentlyClockedIn } = this.props;

    // let { startTime, clockOutTime, clockInTime, endTime, title, location } = shift;

    // startTime = moment(startTime);

    // let day = `${moment(new Date(startTime)).format('dddd [the] Do [at] h:mm a')} to ${moment(new Date(endTime)).format('h:mm a')}`;

    // let buttons = [<a className="waves-effect waves-light btn" key={ 1 } onClick={ this.edit } >Edit Shift</a>];

    // if (!currentlyClockedIn && (moment(new Date(startTime))).isSame(moment(new Date()), 'day'))
    //   buttons.push(<a className="waves-effect waves-light btn" key={ 2 } onClick={ this.start } >Start Shift</a>);
    // if (clockInTime !== "undefined" && clockOutTime == "undefined")
    //   buttons.push(<a className="waves-effect waves-light btn" key={ 3 } style={{ margin: '0 0 10px 0' }} onClick={ this.resume }>Resume Shift</a>);

    return (
      <div className='card grey lighten-4 row waves-effect waves-block default' style={{ margin: '10px 10px 10px 10px' }}>
        <div className='card-content'>
          <h5 className='activator'>{ day }<MoreVertIcon className='activator right' color={ "black" } /></h5>
          <p>{`Shift Title: ${ title }${<br />}Shift location: ${ location }`</p>
        </div>
        <div className='card-reveal'>
          <span className='card-title' style={{ margin: '5px' }}><CloseIcon className='right card-title' color={ "black" } /></span>
          { buttons }
        </div>
      </div>
      <div className='card grey lighten-4' style={{ margin: '10px' }}>
        <h5>{ day }</h5>
        <p>{ `${title} ${location ? ' - ' + location : ''}` }</p>
        {/* make expandable */}
          { buttons }
      </div>
    );

  }

}

ShiftCard.propTypes = {
  shift: PropTypes.object.isRequired,
  currentlyClockedIn: PropTypes.bool
}