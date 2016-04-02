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

export default class Home extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    $(this.refs.test).sideNav();
  }


  addShift() {
    FlowRouter.go('/shifts');
  }

  // openSideNav() {
  //   LeftNavOpen.set(true);
  // }

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

        { shiftList }

        <div className='card grey lighten-4 row waves-effect waves-block default' style={{ margin: '10px 10px 10px 10px' }}>
          <div className='card-content'>
            <h5 className='activator'>Sunday the 5th<MoreVertIcon className='activator right' color={ "black" } /></h5>
            <p>Shift Title: Chicken <br /> Shift location: Butt</p>
          </div>
          <div className='card-reveal'>
            <span className='card-title' style={{ margin: '5px' }}><CloseIcon className='right card-title' color={ "black" } /></span>
            <a className="waves-effect waves-light btn" key={ 1 } style={{ margin: '0 0 10px 0' }} >Resume Shift</a><br />
            <a className="waves-effect waves-light btn" key={ 2 } >End Shift</a>
          </div>
        </div>

        <div className='card grey lighten-4 row waves-effect waves-block default' style={{ margin: '10px 10px 10px 10px' }}>
          <div className='card-content'>
            <h5 className='activator'>Sunday the 5th<MoreVertIcon className='activator right' color={ "black" } /></h5>
            <p>Shift Title: Chicken <br /> Shift location: Butt</p>
          </div>
          <div className='card-reveal'>
            <span className='card-title' style={{ margin: '5px' }}><CloseIcon className='right card-title' color={ "black" } /></span>
            <a className="waves-effect waves-light btn" key={ 1 } style={{ margin: '0 0 10px 0' }} >Resume Shift</a><br />
            <a className="waves-effect waves-light btn" key={ 2 } >End Shift</a>
          </div>
        </div>

        <div className='card grey lighten-4 row waves-effect waves-block default' style={{ margin: '10px 10px 10px 10px' }}>
          <div className='card-content'>
            <h5 className='activator'>Sunday the 5th<MoreVertIcon className='activator right' color={ "black" } /></h5>
            <p>Shift Title: Chicken <br /> Shift location: Butt</p>
          </div>
          <div className='card-reveal'>
            <span className='card-title' style={{ margin: '5px' }}><CloseIcon className='right card-title' color={ "black" } /></span>
            <a className="waves-effect waves-light btn" key={ 1 } style={{ margin: '0 0 10px 0' }} >Resume Shift</a><br />
            <a className="waves-effect waves-light btn" key={ 2 } >End Shift</a>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  shifts: PropTypes.array.isRequired
}